const baseProperties = [
  {
    id: 1,
    title: "Luxury Penthouse in Midtown Manhattan",
    type: "apartment",
    listing: "sale",
    price: 545000,
    location: "Midtown, New York, NY",
    city: "New York",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80"
    ],
    description: "Full-floor penthouse with skyline views, wraparound terrace, and premium finishes.",
    amenities: ["Rooftop Pool", "Gym", "Doorman", "Private Garage", "Concierge", "In-unit Laundry"],
    agent: { name: "Ashley Monroe", phone: "+1 (212) 555-0192", email: "ashley@nestfinder.com", avatar: "AM" },
    featured: true,
    new: true,
    lat: 40.7549,
    lng: -73.984
  },
  {
    id: 2,
    title: "Modern Family Home in Beverly Hills",
    type: "house",
    listing: "sale",
    price: 545000,
    location: "Beverly Hills, Los Angeles, CA",
    city: "Los Angeles",
    bedrooms: 5,
    bathrooms: 4,
    area: 4800,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80"
    ],
    description: "Contemporary estate with open living, resort-style outdoor space, and a 3-car garage.",
    amenities: ["Pool & Spa", "3-Car Garage", "Smart Home", "Home Theater", "Wine Cellar"],
    agent: { name: "Marcus Reid", phone: "+1 (310) 555-0847", email: "marcus@nestfinder.com", avatar: "MR" },
    featured: true,
    new: false,
    lat: 34.0736,
    lng: -118.4004
  },
  {
    id: 3,
    title: "Upscale 3-Bed in South Beach",
    type: "apartment",
    listing: "rent",
    price: 8500,
    location: "South Beach, Miami, FL",
    city: "Miami",
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80"
    ],
    description: "Luxury furnished apartment steps from the ocean with balcony, pool, and concierge.",
    amenities: ["Ocean View", "Pool", "Valet Parking", "Concierge", "Gym"],
    agent: { name: "Sofia Delgado", phone: "+1 (305) 555-0374", email: "sofia@nestfinder.com", avatar: "SD" },
    featured: true,
    new: true,
    lat: 25.7825,
    lng: -80.13
  },
  {
    id: 4,
    title: "Stylish Studio in Capitol Hill",
    type: "apartment",
    listing: "rent",
    price: 2200,
    location: "Capitol Hill, Seattle, WA",
    city: "Seattle",
    bedrooms: 1,
    bathrooms: 1,
    area: 680,
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
    ],
    description: "Bright studio with hardwood floors, quartz counters, in-unit laundry, and roof deck.",
    amenities: ["In-Unit W/D", "Bike Storage", "Rooftop Deck", "Secure Entry"],
    agent: { name: "Jordan Park", phone: "+1 (206) 555-0519", email: "jordan@nestfinder.com", avatar: "JP" },
    featured: false,
    new: true,
    lat: 47.6253,
    lng: -122.3222
  },
  {
    id: 5,
    title: "Grand Estate in River Oaks",
    type: "house",
    listing: "sale",
    price: 545000,
    location: "River Oaks, Houston, TX",
    city: "Houston",
    bedrooms: 6,
    bathrooms: 5,
    area: 7400,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
    ],
    description: "Prestigious estate with cinema, office, and resort-style pool.",
    amenities: ["Private Pool", "Home Cinema", "Smart Home", "Gated Entry", "Guest House"],
    agent: { name: "Catherine Wells", phone: "+1 (713) 555-0263", email: "catherine@nestfinder.com", avatar: "CW" },
    featured: true,
    new: false,
    lat: 29.7479,
    lng: -95.4219
  },
  {
    id: 6,
    title: "Coastal Home in Coronado",
    type: "house",
    listing: "sale",
    price: 545000,
    location: "Coronado, San Diego, CA",
    city: "San Diego",
    bedrooms: 4,
    bathrooms: 3,
    area: 3600,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80"
    ],
    description: "Coastal home with bay views, beach access, and indoor-outdoor flow.",
    amenities: ["Ocean View", "Deck", "2-Car Garage", "Fireplace", "Walk to Beach"],
    agent: { name: "Lena Hartman", phone: "+1 (619) 555-0938", email: "lena@nestfinder.com", avatar: "LH" },
    featured: false,
    new: true,
    lat: 32.6859,
    lng: -117.1831
  },
  {
    id: 7,
    title: "Contemporary Loft in Downtown Austin",
    type: "apartment",
    listing: "sale",
    price: 545000,
    location: "Downtown, Austin, TX",
    city: "Austin",
    bedrooms: 2,
    bathrooms: 2,
    area: 1420,
    image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"
    ],
    description: "Downtown loft with skyline views, balcony, and rooftop pool.",
    amenities: ["Rooftop Pool", "Co-working Lounge", "Secure Parking", "Balcony", "Gym"],
    agent: { name: "Elena Brooks", phone: "+1 (512) 555-0148", email: "elena@nestfinder.com", avatar: "EB" },
    featured: true,
    new: true,
    lat: 30.2672,
    lng: -97.7431
  },
  {
    id: 8,
    title: "Family Brownstone in Back Bay",
    type: "house",
    listing: "sale",
    price: 545000,
    location: "Back Bay, Boston, MA",
    city: "Boston",
    bedrooms: 4,
    bathrooms: 3,
    area: 2860,
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80"
    ],
    description: "Historic brownstone with updated interiors and private patio.",
    amenities: ["Private Patio", "Updated Kitchen", "Fireplace", "Near Transit"],
    agent: { name: "Morgan Ellis", phone: "+1 (617) 555-0228", email: "morgan@nestfinder.com", avatar: "ME" },
    featured: false,
    new: false,
    lat: 42.3505,
    lng: -71.0806
  }
];

const cityQuality = {
  "New York": { walkScore: 98, transitScore: 97, schoolRating: 8.9, heat: 91 },
  "Los Angeles": { walkScore: 72, transitScore: 66, schoolRating: 8.4, heat: 78 },
  Miami: { walkScore: 84, transitScore: 74, schoolRating: 8.1, heat: 85 },
  Seattle: { walkScore: 76, transitScore: 71, schoolRating: 8.7, heat: 74 },
  Houston: { walkScore: 60, transitScore: 54, schoolRating: 7.9, heat: 69 },
  "San Diego": { walkScore: 67, transitScore: 58, schoolRating: 8.8, heat: 82 },
  Austin: { walkScore: 68, transitScore: 61, schoolRating: 8.6, heat: 88 },
  Boston: { walkScore: 89, transitScore: 82, schoolRating: 9.1, heat: 80 }
};

const toLabel = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (value) => value.toUpperCase())
    .trim();

const buildPriceHistory = (price, listing, seed) => {
  const baseline = listing === "rent" ? price : price / 1000;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const wave = [0.93, 0.95, 0.97, 0.99, 1, 1.02, 1.04];

  return months.map((month, index) => {
    const nudge = ((seed + index) % 3) * 0.01;
    const value = Math.round(baseline * (wave[index] + nudge));

    return {
      month,
      value: listing === "rent" ? value : value * 1000
    };
  });
};

export const properties = baseProperties.map((property, index) => {
  const quality = cityQuality[property.city] || { walkScore: 70, transitScore: 60, schoolRating: 8.0, heat: 70 };
  const assignedPrice =
    property.listing === "sale"
      ? Math.round(Math.random() * (545000 - 345000) + 345000)
      : property.price;
  const neighborhood = property.location.split(",")[0].trim();

  return {
    ...property,
    price: assignedPrice,
    neighborhood,
    walkScore: Math.min(100, quality.walkScore + (index % 3)),
    transitScore: Math.min(100, quality.transitScore + (index % 2)),
    schoolRating: Number((quality.schoolRating - (index % 3) * 0.2).toFixed(1)),
    marketHeat: Math.min(100, quality.heat + (index % 5) - 2),
    priceHistory: buildPriceHistory(assignedPrice, property.listing, index),
    virtualTourUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(property.title + " virtual tour")}`,
    schools: [
      { name: `${neighborhood} Elementary`, rating: Math.max(6.5, Number((quality.schoolRating - 0.4).toFixed(1))) },
      { name: `${property.city} STEM Academy`, rating: Math.max(6.3, Number((quality.schoolRating - 0.2).toFixed(1))) },
      { name: `${property.city} Prep High`, rating: Math.max(6.1, Number((quality.schoolRating - 0.1).toFixed(1))) }
    ]
  };
});

const uniqueCities = [...new Set(properties.map((property) => property.city))];

export const cities = ["All Cities", ...uniqueCities];
export const metroShortcuts = uniqueCities.slice(0, 6);
export const propertyTypes = ["All Types", "house", "apartment"];
export const listingTypes = ["All", "sale", "rent"];
export const priceRanges = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under $550K", min: 0, max: 550000 },
  { label: "$550K - $1.5M", min: 550000, max: 1500000 },
  { label: "$1.5M - $4M", min: 1500000, max: 4000000 },
  { label: "Above $4M", min: 4000000, max: Infinity }
];

export const marketStats = [
  { label: "Active U.S. listings", value: "58K+", hint: "Across major metros" },
  { label: "Median sale price", value: "$689K", hint: "Luxury to starter homes" },
  { label: "Average rent", value: "$3,420", hint: "Per month in featured markets" },
  { label: "Coverage", value: "50 states", hint: "Coast-to-coast search" }
];

export const marketSignals = [
  { label: "Fastest-growing metro", value: "Austin, TX", detail: "+11.8% annual price growth" },
  { label: "Rental strength", value: "Miami, FL", detail: "High demand for furnished rentals" },
  { label: "Luxury inventory", value: "Los Angeles, CA", detail: "Estate homes and premium condos" },
  { label: "Value market", value: "Houston, TX", detail: "Lower entry prices with strong space" }
];

export const trustSignals = [
  { title: "Verified U.S. listings", text: "Every featured home is tagged with current pricing, location, and agent details." },
  { title: "Live market insights", text: "Track pricing pressure, rent demand, and saved-home activity in one dashboard." },
  { title: "Dollar-first search", text: "All prices, estimates, and comparison tools are displayed in U.S. dollars." }
];

export const searchSuggestions = Array.from(
  new Set(
    properties.flatMap((property) => [
      property.city,
      property.neighborhood,
      property.location,
      toLabel(property.type),
      property.title
    ])
  )
).slice(0, 40);

export const neighborhoodInsights = [
  { city: "New York", state: "NY", score: 94, walkability: 98, transit: 97, schools: 89, lifestyle: "Ultra-dense, premium demand, strong resale velocity" },
  { city: "Los Angeles", state: "CA", score: 90, walkability: 72, transit: 66, schools: 86, lifestyle: "Luxury inventory, lifestyle-driven buyers" },
  { city: "Miami", state: "FL", score: 88, walkability: 84, transit: 74, schools: 82, lifestyle: "Rentals and waterfront homes with high demand" },
  { city: "Austin", state: "TX", score: 92, walkability: 68, transit: 61, schools: 90, lifestyle: "Growth market with strong tech-job demand" },
  { city: "Boston", state: "MA", score: 89, walkability: 89, transit: 82, schools: 92, lifestyle: "Historic housing stock with strong transit" }
];

export const neighborhoodTrendSeries = [
  { label: "Median price", unit: "$", values: [680000, 702000, 721000, 735000, 749000, 761000] },
  { label: "Days on market", unit: "d", values: [41, 39, 37, 34, 32, 30] },
  { label: "Price per sq ft", unit: "$", values: [392, 401, 409, 416, 423, 431] }
];

export const marketHeatZones = Object.values(
  properties.reduce((accumulator, property) => {
    if (!accumulator[property.city]) {
      accumulator[property.city] = {
        city: property.city,
        heat: property.marketHeat,
        lat: property.lat,
        lng: property.lng
      };
    }

    return accumulator;
  }, {})
);
