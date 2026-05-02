import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Map,
  Grid3X3,
  Heart,
  Star,
  TrendingUp,
  Landmark,
  Sparkles,
  X,
  Bell,
  Clock3,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PropertyCard from "./components/PropertyCard";
import Filters from "./components/Filters";
import MapView from "./components/MapView";
import PropertyDetail from "./components/PropertyDetail";
import Auth from "./components/Auth";
import AffordabilityChecker from "./components/AffordabilityChecker";
import RentVsBuyTool from "./components/RentVsBuyTool";
import MortgageCalculator from "./components/MortgageCalculator";
import NeighborhoodCompare from "./components/NeighborhoodCompare";
import NeighborhoodMarketTrends from "./components/NeighborhoodMarketTrends";
import MarketHeatMap from "./components/MarketHeatMap";
import UserDashboard from "./components/UserDashboard";
import useLiveMarketData from "./hooks/useLiveMarketData";
import { isSupabaseConfigured, supabase, toAppUser } from "./lib/supabaseClient";
import {
  addSavedProperty,
  fetchSavedPropertyIds,
  removeSavedProperty,
} from "./lib/savedProperties";
import {
  properties,
  priceRanges,
  marketSignals,
  trustSignals,
  searchSuggestions,
  marketHeatZones,
} from "./data";

const DEFAULT_LISTINGS_BG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2200&q=80";

const DEFAULT_FILTERS = {
  city: "All Cities",
  type: "All Types",
  listing: "All",
  price: 0,
  beds: 0,
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const formatMoney = (value) => money.format(value);

const getStateFromLocation = (location) => {
  const parts = location.split(",").map((part) => part.trim());
  const statePart = parts[parts.length - 1] || "US";
  return statePart.split(" ")[0];
};

export default function App() {
  const { marketCards, metroDashboards, neighborhoodDashboards, lastUpdated } = useLiveMarketData();
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [recentIds, setRecentIds] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [listingTab, setListingTab] = useState("All");
  const [mapAreaIds, setMapAreaIds] = useState(null);
  const [listingsBgImage, setListingsBgImage] = useState(DEFAULT_LISTINGS_BG);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    let isMounted = true;

    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;
      setUser(toAppUser(session?.user || null));
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toAppUser(session?.user || null));
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !user?.id) {
      if (isSupabaseConfigured) {
        setSavedIds([]);
      }
      return;
    }

    let isMounted = true;

    const loadSaved = async () => {
      try {
        const ids = await fetchSavedPropertyIds(user.id);
        if (isMounted) setSavedIds(ids);
      } catch (error) {
        console.error("Failed to load saved properties", error);
      }
    };

    loadSaved();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const handleSetUser = async (nextUser) => {
    if (nextUser === null && isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(nextUser);
  };

  const handleSave = async (id) => {
    const isAlreadySaved = savedIds.includes(id);
    const optimistic = isAlreadySaved
      ? savedIds.filter((value) => value !== id)
      : [...savedIds, id];

    setSavedIds(optimistic);

    if (!isSupabaseConfigured || !user?.id) return;

    try {
      if (isAlreadySaved) {
        await removeSavedProperty(user.id, id);
      } else {
        await addSavedProperty(user.id, id);
      }
    } catch (error) {
      console.error("Failed to save property", error);
      setSavedIds(savedIds);
    }
  };

  const logSearch = ({ query, type, city }) => {
    setSearchHistory((prev) => [
      {
        id: Date.now(),
        query,
        type,
        city,
        when: new Date().toLocaleDateString(),
      },
      ...prev,
    ].slice(0, 18));
  };

  const handleSearch = ({ query, type, city }) => {
    setSearchQuery(query.toLowerCase());
    setFilters((current) => ({
      ...current,
      listing: type,
      city,
    }));
    logSearch({ query, type, city });
    setPage("listings");
  };

  const handleSaveSearch = () => {
    const label = searchQuery ? `Query: ${searchQuery}` : "Current filters";
    setSavedSearches((prev) => [
      {
        id: Date.now(),
        label,
        city: filters.city,
        type: filters.listing,
        createdAt: new Date().toLocaleDateString(),
      },
      ...prev,
    ].slice(0, 10));
  };

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    setRecentIds((prev) => [property.id, ...prev.filter((id) => id !== property.id)].slice(0, 8));
    setPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleListingsBgUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setListingsBgImage(objectUrl);
  };

  const filteredProperties = useMemo(() => {
    let list = properties;

    if (page === "saved") {
      list = list.filter((property) => savedIds.includes(property.id));
    }

    if (page === "buy") {
      list = list.filter((property) => property.listing === "sale");
    }

    if (page === "rent") {
      list = list.filter((property) => property.listing === "rent");
    }

    if (filters.listing !== "All") {
      list = list.filter((property) => property.listing === filters.listing);
    }

    if (listingTab !== "All" && page !== "saved") {
      list = list.filter((property) => property.listing === listingTab);
    }

    if (filters.city !== "All Cities") {
      list = list.filter((property) => property.city === filters.city);
    }

    if (filters.type !== "All Types") {
      list = list.filter((property) => property.type === filters.type);
    }

    if (filters.price !== 0) {
      const range = priceRanges[filters.price];
      list = list.filter((property) => property.price >= range.min && property.price <= range.max);
    }

    if (filters.beds !== 0) {
      list = list.filter((property) => property.bedrooms >= filters.beds);
    }

    if (searchQuery) {
      list = list.filter(
        (property) =>
          property.title.toLowerCase().includes(searchQuery) ||
          property.location.toLowerCase().includes(searchQuery) ||
          property.city.toLowerCase().includes(searchQuery) ||
          property.neighborhood.toLowerCase().includes(searchQuery)
      );
    }

    if (Array.isArray(mapAreaIds)) {
      list = list.filter((property) => mapAreaIds.includes(property.id));
    }

    return list;
  }, [filters, listingTab, mapAreaIds, page, savedIds, searchQuery]);

  const overview = useMemo(() => {
    const saleHomes = properties.filter((property) => property.listing === "sale");
    const rentHomes = properties.filter((property) => property.listing === "rent");
    const avgSalePrice = saleHomes.reduce((sum, property) => sum + property.price, 0) / saleHomes.length;
    const avgRent = rentHomes.reduce((sum, property) => sum + property.price, 0) / rentHomes.length;
    const markets = properties.reduce((accumulator, property) => {
      const cityKey = property.city;

      if (!accumulator[cityKey]) {
        accumulator[cityKey] = {
          city: property.city,
          state: getStateFromLocation(property.location),
          count: 0,
          featuredCount: 0,
          totalPrice: 0,
        };
      }

      accumulator[cityKey].count += 1;
      accumulator[cityKey].featuredCount += property.featured ? 1 : 0;
      accumulator[cityKey].totalPrice += property.price;
      return accumulator;
    }, {});

    return {
      avgSalePrice,
      avgRent,
      totalListings: properties.length,
      featuredCount: properties.filter((property) => property.featured).length,
      marketList: Object.values(markets)
        .sort((left, right) => right.featuredCount - left.featuredCount || right.totalPrice - left.totalPrice)
        .slice(0, 4),
    };
  }, []);

  const listingSummary = useMemo(() => {
    const saleHomes = filteredProperties.filter((property) => property.listing === "sale");
    const rentHomes = filteredProperties.filter((property) => property.listing === "rent");
    const averagePrice = filteredProperties.length
      ? filteredProperties.reduce((sum, property) => sum + property.price, 0) / filteredProperties.length
      : 0;

    return {
      averagePrice,
      saleCount: saleHomes.length,
      rentCount: rentHomes.length,
    };
  }, [filteredProperties]);

  const similarProperties = useMemo(() => {
    if (!selectedProperty) return [];
    return properties
      .filter(
        (property) =>
          property.id !== selectedProperty.id &&
          (property.city === selectedProperty.city || property.type === selectedProperty.type)
      )
      .slice(0, 3);
  }, [selectedProperty]);

  const recentProperties = useMemo(
    () => recentIds.map((id) => properties.find((property) => property.id === id)).filter(Boolean),
    [recentIds]
  );

  const savedProperties = useMemo(
    () => properties.filter((property) => savedIds.includes(property.id)),
    [savedIds]
  );

  const isListingsPage = ["buy", "rent", "saved", "listings"].includes(page);
  const pageTitle = page === "saved" ? "Saved Properties" : page === "buy" ? "Homes for Sale" : page === "rent" ? "Homes for Rent" : "Browse Properties";

  if (page === "login" || page === "signup") {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar page={page} setPage={setPage} user={user} setUser={handleSetUser} savedCount={savedIds.length} />
        <Auth mode={page} setPage={setPage} setUser={handleSetUser} />
      </div>
    );
  }

  if (page === "dashboard") {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar page={page} setPage={setPage} user={user} setUser={handleSetUser} savedCount={savedIds.length} />
        <UserDashboard
          user={user}
          savedProperties={savedProperties}
          recentProperties={recentProperties}
          searchHistory={searchHistory}
          savedSearches={savedSearches}
          emailAlerts={emailAlerts}
          setEmailAlerts={setEmailAlerts}
          onOpenProperty={handleSelectProperty}
          onRemoveSavedSearch={(id) => setSavedSearches((prev) => prev.filter((search) => search.id !== id))}
        />
      </div>
    );
  }

  if (page === "detail" && selectedProperty) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar page={page} setPage={setPage} user={user} setUser={handleSetUser} savedCount={savedIds.length} />
        <div className="pt-16">
          <PropertyDetail
            property={selectedProperty}
            onBack={() => setPage("listings")}
            onSave={handleSave}
            isSaved={savedIds.includes(selectedProperty.id)}
            similarProperties={similarProperties}
            onOpenProperty={handleSelectProperty}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar page={page} setPage={setPage} user={user} setUser={handleSetUser} savedCount={savedIds.length} />

      {page === "home" && (
        <>
          <Hero onSearch={handleSearch} marketStats={marketCards} />

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {marketCards.map((stat) => (
                <div key={stat.label} className="bg-dark-800/90 backdrop-blur border border-white/10 rounded-2xl p-5 shadow-2xl shadow-black/20">
                  <p className="text-white/35 text-xs uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                  <p className="font-display text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-white/45 text-sm">{stat.hint}</p>
                  <p className="text-white/25 text-[11px] uppercase tracking-[0.18em] mt-2">{stat.changeLabel || stat.source}</p>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-xs mt-3 text-right">Live public FRED data {lastUpdated ? `updated ${lastUpdated}` : "loading..."}</p>
          </section>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 text-brand-500 text-sm font-medium mb-2">
                  <Star size={14} fill="currentColor" />
                  Featured U.S. Properties
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Handpicked homes across the United States</h2>
                <p className="text-white/45 mt-2 max-w-2xl">Browse the most active listings in premium U.S. metros, all priced in dollars and ready to compare.</p>
              </div>
              <button onClick={() => setPage("listings")} className="btn-secondary text-sm hidden sm:flex">View All -&gt;</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties
                .filter((property) => property.featured)
                .map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSelect={handleSelectProperty}
                    onSave={handleSave}
                    isSaved={savedIds.includes(property.id)}
                  />
                ))}
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex items-center gap-2 text-brand-500 text-sm font-medium mb-3">
              <Sparkles size={14} />
              New this week
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {properties.filter((property) => property.new).slice(0, 4).map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={handleSelectProperty}
                  onSave={handleSave}
                  isSaved={savedIds.includes(property.id)}
                />
              ))}
            </div>
          </section>

          {recentProperties.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex items-center gap-2 text-brand-500 text-sm font-medium mb-3">
                <Clock3 size={14} />
                Recently viewed
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentProperties.slice(0, 4).map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSelect={handleSelectProperty}
                    onSave={handleSave}
                    isSaved={savedIds.includes(property.id)}
                  />
                ))}
              </div>
            </section>
          )}

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
              <div className="bg-dark-800/60 border border-white/10 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-2 text-brand-500 text-sm font-medium mb-3">
                  <TrendingUp size={14} />
                  Market Pulse
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">Follow price and rent momentum by metro</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {marketSignals.map((signal) => (
                    <div key={signal.label} className="bg-dark-700/80 rounded-2xl border border-white/5 p-4">
                      <p className="text-white/35 text-xs uppercase tracking-[0.2em] mb-2">{signal.label}</p>
                      <p className="text-white font-semibold text-lg mb-1">{signal.value}</p>
                      <p className="text-white/45 text-sm">{signal.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-dark-800/60 border border-white/10 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-2 text-brand-500 text-sm font-medium mb-3">
                  <Landmark size={14} />
                  Featured Markets
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">High-intent metros in the U.S. market</h2>
                <div className="space-y-3">
                  {overview.marketList.map((market) => (
                    <div key={market.city} className="flex items-center justify-between gap-4 bg-dark-700/80 rounded-2xl border border-white/5 p-4">
                      <div>
                        <p className="font-semibold text-white">{market.city}, {market.state}</p>
                        <p className="text-white/40 text-sm">{market.count} active listings</p>
                      </div>
                      <div className="text-right">
                        <p className="text-brand-500 font-semibold">{formatMoney(Math.round(market.totalPrice / market.count))}</p>
                        <p className="text-white/35 text-xs">Average asking price</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MortgageCalculator price={properties[0]?.price || 750000} />
            <AffordabilityChecker />
            <RentVsBuyTool />
          </section>

          <NeighborhoodMarketTrends />
          <MarketHeatMap zones={marketHeatZones} />

          <section className="bg-dark-800/50 border-y border-white/5 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 text-brand-500 text-sm font-medium mb-3">
                  <Sparkles size={14} />
                  Why this feels like a premium portal
                </div>
                <h2 className="font-display text-3xl font-bold text-white mb-3">Built for serious U.S. home search</h2>
                <p className="text-white/45">This experience is centered on current U.S. inventory, price comparisons, and map-driven search tools.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {trustSignals.map((item) => (
                  <div key={item.title} className="bg-dark-800 border border-white/10 rounded-2xl p-6 hover:border-brand-500/30 transition-colors">
                    <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <NeighborhoodCompare metroDashboards={metroDashboards} neighborhoods={neighborhoodDashboards} />
        </>
      )}

      {isListingsPage && (
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-white">
                {page === "saved" ? (
                  <span className="flex items-center gap-2">
                    <Heart size={28} className="text-brand-500" fill="currentColor" />
                    Saved Properties
                  </span>
                ) : (
                  pageTitle
                )}
              </h1>
              {page !== "saved" && (
                <p className="text-white/45 mt-2 max-w-2xl">Filter by city, price, and property type, then draw on map to narrow your search zone.</p>
              )}
            </div>

            {page !== "saved" && (
              <section className="relative rounded-3xl overflow-hidden border border-white/10 mb-8">
                <img src={listingsBgImage} alt="Listings background" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/75" />

                <div className="relative z-10 p-5 sm:p-6 lg:p-8 space-y-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="w-full lg:w-auto lg:min-w-[400px]">
                      <label className="text-xs text-white/65 font-medium uppercase tracking-wider block mb-2">Search homes and cities</label>
                      <div className="flex items-center gap-2 bg-black/35 border border-white/15 rounded-2xl px-4 py-3 backdrop-blur-sm">
                        <Search size={16} className="text-white/40 flex-shrink-0" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(event) => {
                            setSearchQuery(event.target.value);
                            setMapAreaIds(null);
                          }}
                          placeholder="Search a house, city, or neighborhood"
                          className="bg-transparent border-0 outline-none text-white placeholder:text-white/45 w-full text-sm"
                          list="listing-search-suggestions"
                        />
                        <datalist id="listing-search-suggestions">
                          {searchSuggestions.map((suggestion) => (
                            <option key={suggestion} value={suggestion} />
                          ))}
                        </datalist>
                        {searchQuery && (
                          <button onClick={() => setSearchQuery("")} className="text-white/40 hover:text-white transition-colors" aria-label="Clear search">
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 items-center">
                      <button onClick={handleSaveSearch} className="px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wide border border-brand-500/40 bg-brand-500/15 text-brand-500 hover:bg-brand-500/25 transition-colors">
                        <Bell size={14} className="inline-block mr-1" />
                        Save Search
                      </button>

                      <label htmlFor="listings-bg-upload" className="px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wide cursor-pointer border border-white/20 bg-black/30 text-white/85 hover:bg-black/45 transition-colors">
                        Upload Background Image
                      </label>
                      <input id="listings-bg-upload" type="file" accept="image/*" onChange={handleListingsBgUpload} className="hidden" />

                      <div className="flex bg-black/35 border border-white/15 rounded-xl p-1 gap-1 backdrop-blur-sm">
                        <button onClick={() => setViewMode("grid")} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${viewMode === "grid" ? "bg-brand-500 text-white" : "text-white/70 hover:text-white"}`}>
                          <Grid3X3 size={14} />
                          Grid
                        </button>
                        <button onClick={() => setViewMode("map")} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${viewMode === "map" ? "bg-brand-500 text-white" : "text-white/70 hover:text-white"}`}>
                          <Map size={14} />
                          Map
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {["All", "sale", "rent"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setListingTab(tab)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                          listingTab === tab
                            ? "bg-brand-500 text-white"
                            : "text-white/70 hover:text-white border border-white/20 hover:border-white/40 bg-black/30"
                        }`}
                      >
                        {tab === "All" ? "All" : tab === "sale" ? "For Sale" : "For Rent"}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-black/35 border border-white/15 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-white/55 text-xs uppercase tracking-[0.2em] mb-1">Filtered results</p>
                      <p className="text-2xl font-display font-bold text-white">{filteredProperties.length}</p>
                    </div>
                    <div className="bg-black/35 border border-white/15 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-white/55 text-xs uppercase tracking-[0.2em] mb-1">Average price</p>
                      <p className="text-2xl font-display font-bold text-white">{listingSummary.averagePrice ? formatMoney(Math.round(listingSummary.averagePrice)) : "$0"}</p>
                    </div>
                    <div className="bg-black/35 border border-white/15 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-white/55 text-xs uppercase tracking-[0.2em] mb-1">Sale / rent mix</p>
                      <p className="text-2xl font-display font-bold text-white">{listingSummary.saleCount} / {listingSummary.rentCount}</p>
                    </div>
                  </div>

                  <Filters filters={filters} setFilters={setFilters} total={filteredProperties.length} />
                </div>
              </section>
            )}

            {viewMode === "map" && page !== "saved" && (
              <div className="mb-8">
                <MapView properties={filteredProperties} onSelect={handleSelectProperty} onAreaFilterChange={setMapAreaIds} />
              </div>
            )}

            {(viewMode === "grid" || page === "saved") && (
              <>
                {filteredProperties.length === 0 ? (
                  <div className="text-center py-20">
                    <h3 className="font-display text-2xl text-white mb-2">{page === "saved" ? "No Saved Properties" : "No Results Found"}</h3>
                    <p className="text-white/40 text-sm">{page === "saved" ? "Start exploring and save properties you love." : "Try adjusting your filters, search term, or map area."}</p>
                    {page === "saved" && (
                      <button onClick={() => setPage("listings")} className="btn-primary mt-6">
                        Browse Properties
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onSelect={handleSelectProperty}
                        onSave={handleSave}
                        isSaved={savedIds.includes(property.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center border-t border-white/5 mt-0">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">N</span>
          </div>
          <span className="font-display text-lg font-semibold text-white">
            Nest<span className="text-brand-500">Finder</span>
          </span>
        </div>
        <p className="text-white/30 text-sm">(c) 2026 NestFinder Inc. U.S. market data shown in USD.</p>
      </footer>
    </div>
  );
}
