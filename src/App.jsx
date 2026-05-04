import { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PropertyCard from "./components/PropertyCard";
import Filters from "./components/Filters";
import MapView from "./components/MapView";
import PropertyDetail from "./components/PropertyDetail";
import Auth from "./components/Auth";
import Testimonials from "./components/Testimonials";
import HowItWorks from "./components/HowItWorks";
import Newsletter from "./components/Newsletter";
import MortgageCalculator from "./components/MortgageCalculator";
import { properties, priceRanges } from "./data";
import { Map, Grid3X3, Heart, Star, Calculator } from "lucide-react";

const DEFAULT_FILTERS = {
  city: "All Cities",
  type: "All Types",
  listing: "All",
  price: 0,
  beds: 0,
};

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [listingTab, setListingTab] = useState("All");
  const [showCalcPage, setShowCalcPage] = useState(false);

  const handleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSearch = ({ query, type, city }) => {
    setSearchQuery(query.toLowerCase());
    setFilters((f) => ({ ...f, listing: type, city }));
    setPage("listings");
  };

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    setPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProperties = useMemo(() => {
    let list = properties;
    if (page === "saved") list = list.filter((p) => savedIds.includes(p.id));
    if (filters.listing !== "All") list = list.filter((p) => p.listing === filters.listing);
    if (listingTab !== "All" && page !== "saved") list = list.filter((p) => p.listing === listingTab);
    if (filters.city !== "All Cities") list = list.filter((p) => p.city === filters.city);
    if (filters.type !== "All Types") list = list.filter((p) => p.type === filters.type);
    if (filters.price !== 0) {
      const range = priceRanges[filters.price];
      list = list.filter((p) => p.price >= range.min && p.price <= range.max);
    }
    if (filters.beds !== 0) list = list.filter((p) => p.bedrooms >= filters.beds);
    if (searchQuery) list = list.filter((p) =>
      p.title.toLowerCase().includes(searchQuery) ||
      p.location.toLowerCase().includes(searchQuery) ||
      p.city.toLowerCase().includes(searchQuery)
    );
    return list;
  }, [filters, searchQuery, savedIds, page, listingTab]);

  // Auth pages
  if (page === "login" || page === "signup") {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar page={page} setPage={setPage} user={user} setUser={setUser} savedCount={savedIds.length} />
        <Auth mode={page} setPage={setPage} setUser={setUser} />
      </div>
    );
  }

  // Detail page
  if (page === "detail" && selectedProperty) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar page={page} setPage={setPage} user={user} setUser={setUser} savedCount={savedIds.length} />
        <div className="pt-16">
          <PropertyDetail
            property={selectedProperty}
            onBack={() => setPage("listings")}
            onSave={handleSave}
            isSaved={savedIds.includes(selectedProperty.id)}
            savedIds={savedIds}
            onSelect={handleSelectProperty}
          />
        </div>
      </div>
    );
  }

  const isListingsPage = ["buy", "rent", "saved", "listings"].includes(page);

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar page={page} setPage={setPage} user={user} setUser={setUser} savedCount={savedIds.length} />

      {/* HOME PAGE */}
      {page === "home" && (
        <>
          <Hero onSearch={handleSearch} />

          {/* How It Works */}
          <HowItWorks />

          {/* Featured Properties */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 text-brand-500 text-sm font-medium mb-2">
                  <Star size={14} fill="currentColor" />
                  Featured Properties
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Handpicked for You</h2>
              </div>
              <button onClick={() => setPage("listings")} className="btn-secondary text-sm hidden sm:flex">View All →</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.filter((p) => p.featured).map((p) => (
                <PropertyCard key={p.id} property={p} onSelect={handleSelectProperty} onSave={handleSave} isSaved={savedIds.includes(p.id)} />
              ))}
            </div>
            <div className="text-center mt-10">
              <button onClick={() => setPage("listings")} className="btn-primary">Explore All Properties</button>
            </div>
          </section>

          {/* Testimonials */}
          <div className="bg-dark-800/30 border-y border-white/5">
            <Testimonials />
          </div>

          {/* Mortgage Calculator Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-2 text-sm text-brand-500 font-medium mb-4">
                <Calculator size={13} />
                Financial Tools
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">Plan Your Purchase</h2>
              <p className="text-white/40 text-lg max-w-xl mx-auto">Use our mortgage calculator to figure out exactly what you can afford before you start searching.</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <MortgageCalculator />
            </div>
          </section>

          {/* Why NestFinder */}
          <section className="bg-dark-800/50 border-y border-white/5 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-3xl font-bold text-white text-center mb-12">Why Choose NestFinder?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { icon: "🏠", title: "Verified Listings", desc: "Every property is verified by our agents before going live. No fake listings, guaranteed." },
                  { icon: "🤝", title: "Licensed Agents", desc: "Connect directly with NAR-certified, licensed agents across all 50 states." },
                  { icon: "🔒", title: "Secure Transactions", desc: "Our platform uses bank-level encryption and verified escrow to protect every deal." },
                ].map((item) => (
                  <div key={item.title} className="bg-dark-800 border border-white/10 rounded-2xl p-6 text-center hover:border-brand-500/30 transition-colors">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <Newsletter />

          {/* Footer */}
          <footer className="border-t border-white/5 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center"><span className="text-white text-xs font-bold">N</span></div>
                    <span className="font-display text-lg font-semibold text-white">Nest<span className="text-brand-500">Finder</span></span>
                  </div>
                  <p className="text-white/30 text-xs leading-relaxed">America's premier platform for buying, renting, and discovering your perfect home.</p>
                </div>
                {[
                  { title: "Company", links: ["About Us", "Careers", "Press", "Blog"] },
                  { title: "Services", links: ["Buy a Home", "Rent a Home", "List a Property", "Find an Agent"] },
                  { title: "Support", links: ["Help Center", "Privacy Policy", "Terms of Service", "Contact Us"] },
                ].map((col) => (
                  <div key={col.title}>
                    <h4 className="text-white font-semibold text-sm mb-3">{col.title}</h4>
                    <div className="space-y-2">
                      {col.links.map((l) => (
                        <button key={l} className="block text-white/30 hover:text-white/60 text-xs transition-colors">{l}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 pt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-white/20 text-xs">© 2025 NestFinder Inc. All rights reserved.</p>
                <p className="text-white/20 text-xs">🇺🇸 Serving all 50 U.S. States</p>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* LISTINGS PAGE */}
      {isListingsPage && (
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold text-white">
                  {page === "saved" ? (
                    <span className="flex items-center gap-2"><Heart size={28} className="text-brand-500" fill="currentColor" />Saved Properties</span>
                  ) : "Browse Properties"}
                </h1>
                {page !== "saved" && (
                  <div className="flex gap-2 mt-3">
                    {["All", "sale", "rent"].map((t) => (
                      <button key={t} onClick={() => setListingTab(t)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${listingTab === t ? "bg-brand-500 text-white" : "text-white/50 hover:text-white border border-white/10 hover:border-white/30"}`}>
                        {t === "All" ? "All" : t === "sale" ? "For Sale" : "For Rent"}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {page !== "saved" && (
                <div className="flex bg-dark-800 border border-white/10 rounded-xl p-1 gap-1">
                  {[{ mode: "grid", icon: <Grid3X3 size={14} />, label: "Grid" }, { mode: "map", icon: <Map size={14} />, label: "Map" }].map((v) => (
                    <button key={v.mode} onClick={() => setViewMode(v.mode)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${viewMode === v.mode ? "bg-brand-500 text-white" : "text-white/50 hover:text-white"}`}>
                      {v.icon}{v.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {page !== "saved" && <Filters filters={filters} setFilters={setFilters} total={filteredProperties.length} />}

            {viewMode === "map" && page !== "saved" && (
              <div className="mb-8"><MapView properties={filteredProperties} onSelect={handleSelectProperty} /></div>
            )}

            {(viewMode === "grid" || page === "saved") && (
              <>
                {filteredProperties.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">{page === "saved" ? "💔" : "🏠"}</div>
                    <h3 className="font-display text-2xl text-white mb-2">{page === "saved" ? "No Saved Properties" : "No Results Found"}</h3>
                    <p className="text-white/40 text-sm">{page === "saved" ? "Start exploring and save properties you love." : "Try adjusting your filters or search for a different area."}</p>
                    {page === "saved" && <button onClick={() => setPage("listings")} className="btn-primary mt-6">Browse Properties</button>}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((p) => (
                      <PropertyCard key={p.id} property={p} onSelect={handleSelectProperty} onSave={handleSave} isSaved={savedIds.includes(p.id)} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
