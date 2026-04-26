import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { properties } from './src/data.js';

const SERIES = [
  {
    id: 'MORTGAGE30US',
    label: '30-year fixed mortgage',
    format: 'rate',
    source: 'Federal Reserve Economic Data',
  },
  {
    id: 'CSUSHPINSA',
    label: 'U.S. home price index',
    format: 'index',
    source: 'Case-Shiller national index',
  },
  {
    id: 'HOSMEDUSM052N',
    label: 'Median home price',
    format: 'currency',
    source: 'U.S. housing market',
  },
];

const FRED_BASE = 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=';
const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const rate = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const plain = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

const parseCsv = (csvText) => {
  const rows = csvText.trim().split(/\r?\n/).slice(1);
  return rows
    .map((row) => {
      const [date, value] = row.split(',');
      return { date, value: Number(value) };
    })
    .filter((entry) => Number.isFinite(entry.value));
};

const formatValue = (value, format) => {
  if (format === 'currency') return currency.format(value);
  if (format === 'rate') return `${rate.format(value)}%`;
  return plain.format(value);
};

const formatChange = (change, format) => {
  const prefix = change >= 0 ? '+' : '-';
  const absolute = Math.abs(change);

  if (format === 'currency') return `${prefix}${currency.format(absolute)}`;
  if (format === 'rate') return `${prefix}${rate.format(absolute)} pts`;
  return `${prefix}${plain.format(absolute)}`;
};

const getStateFromLocation = (location) => {
  const parts = location.split(',').map((part) => part.trim());
  return (parts[parts.length - 1] || 'US').split(' ')[0];
};

const buildMetroDashboards = ({ mortgageRate, medianHomePrice }) => {
  const cities = properties.reduce((accumulator, property) => {
    const cityKey = property.city;
    if (!accumulator[cityKey]) {
      accumulator[cityKey] = {
        city: property.city,
        state: getStateFromLocation(property.location),
        listings: [],
      };
    }
    accumulator[cityKey].listings.push(property);
    return accumulator;
  }, {});

  const nationalMedian = medianHomePrice || 400000;

  return Object.values(cities)
    .map((metro) => {
      const listingCount = metro.listings.length;
      const saleListings = metro.listings.filter((property) => property.listing === 'sale');
      const rentListings = metro.listings.filter((property) => property.listing === 'rent');
      const avgPrice = metro.listings.reduce((sum, property) => sum + property.price, 0) / listingCount;
      const avgRent = rentListings.length
        ? rentListings.reduce((sum, property) => sum + property.price, 0) / rentListings.length
        : 0;
      const avgSqFt = metro.listings.reduce((sum, property) => sum + property.area, 0) / listingCount;
      const avgPricePerSqFt = Math.round(avgPrice / avgSqFt);
      const priceRatio = avgPrice / nationalMedian;
      const affordabilityScore = Math.max(20, Math.min(98, Math.round(100 - priceRatio * 25 + (5 - mortgageRate) * 3)));
      const momentum = Math.max(
        41,
        Math.min(99, Math.round(60 + saleListings.length * 6 + rentListings.length * 4 + (metro.listings.filter((property) => property.featured).length * 5)))
      );

      return {
        city: metro.city,
        state: metro.state,
        listings: listingCount,
        saleListings: saleListings.length,
        rentListings: rentListings.length,
        avgPrice: currency.format(avgPrice),
        avgRent: rentListings.length ? currency.format(avgRent) : 'N/A',
        avgPricePerSqFt: currency.format(avgPricePerSqFt),
        affordabilityScore,
        momentum,
        trendLabel: priceRatio > 1.4 ? 'Luxury market' : priceRatio > 0.9 ? 'Balanced demand' : 'Value market',
        updatedAt: new Date().toISOString(),
      };
    })
    .sort((left, right) => right.momentum - left.momentum)
    .slice(0, 5);
};

const buildNeighborhoodDashboards = ({ mortgageRate, homePriceIndex }) => {
  return properties
    .map((property) => {
      const walkability = Math.max(55, Math.min(98, Math.round(70 + property.bedrooms * 2 + (property.listing === 'rent' ? 6 : 0))));
      const transit = Math.max(45, Math.min(97, Math.round(62 + (property.city === 'New York' || property.city === 'Chicago' ? 22 : 0) + (property.listing === 'rent' ? 4 : 0))));
      const schools = Math.max(50, Math.min(96, Math.round(68 + property.bedrooms * 3 + (property.type === 'house' ? 4 : 0))));
      const score = Math.max(62, Math.min(98, Math.round((walkability + transit + schools) / 3 + (homePriceIndex > 300 ? 2 : -2) + (mortgageRate < 6.5 ? 2 : -1))));

      return {
        city: property.city,
        state: getStateFromLocation(property.location),
        score,
        walkability,
        transit,
        schools,
        lifestyle:
          property.city === 'New York'
            ? 'Ultra-dense, premium demand, strong resale velocity'
            : property.city === 'Los Angeles'
              ? 'Luxury inventory, lifestyle-driven buyers, strong coastal demand'
              : property.city === 'Miami'
                ? 'Rentals and waterfront homes with high seasonal demand'
                : property.city === 'Austin'
                  ? 'Growth market with strong tech-job demand and price momentum'
                  : 'Balanced affordability, urban amenities, and large inventory',
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 5);
};

const buildMarketPayload = async () => {
  const series = await Promise.all(
    SERIES.map(async (item) => {
      const response = await fetch(`${FRED_BASE}${item.id}`);
      if (!response.ok) {
        throw new Error(`Unable to load ${item.id}`);
      }

      const csvText = await response.text();
      const rows = parseCsv(csvText);
      const latest = rows.at(-1);
      const previous = rows.at(-2) ?? latest;
      const change = latest.value - previous.value;

      return {
        ...item,
        latest,
        value: formatValue(latest.value, item.format),
        changeLabel: formatChange(change, item.format),
        updatedAt: latest.date,
      };
    })
  );

  const mortgageRate = series.find((entry) => entry.id === 'MORTGAGE30US')?.latest?.value ?? 0;
  const homePriceIndex = series.find((entry) => entry.id === 'CSUSHPINSA')?.latest?.value ?? 0;
  const medianHomePrice = series.find((entry) => entry.id === 'HOSMEDUSM052N')?.latest?.value ?? 0;

  return {
    updatedAt: new Date().toISOString(),
    marketCards: series.map((entry) => ({
      label: entry.label,
      value: entry.value,
      hint: entry.source,
      changeLabel: entry.changeLabel,
      updatedAt: entry.updatedAt,
    })),
    metroDashboards: buildMetroDashboards({ mortgageRate, medianHomePrice }),
    neighborhoodDashboards: buildNeighborhoodDashboards({ mortgageRate, homePriceIndex }),
  };
};

const marketApiPlugin = () => ({
  name: 'market-api-route',
  configureServer(server) {
    server.middlewares.use('/api/market/overview', async (_req, res, next) => {
      try {
        const payload = await buildMarketPayload();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(payload));
      } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Unable to load live market data' }));
      }
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use('/api/market/overview', async (_req, res) => {
      try {
        const payload = await buildMarketPayload();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(payload));
      } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Unable to load live market data' }));
      }
    });
  },
});

export default defineConfig({
  plugins: [react(), marketApiPlugin()],
})
