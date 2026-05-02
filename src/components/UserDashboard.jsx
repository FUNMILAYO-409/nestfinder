export default function UserDashboard({
  user,
  savedProperties,
  recentProperties,
  searchHistory,
  savedSearches,
  emailAlerts,
  setEmailAlerts,
  onOpenProperty,
  onRemoveSavedSearch,
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      <div className="bg-dark-800 border border-white/10 rounded-3xl p-6 sm:p-8">
        <h1 className="font-display text-3xl text-white">Profile Dashboard</h1>
        <p className="text-white/45 mt-2">{user ? `Welcome back, ${user.name}.` : "Sign in to sync saved homes and alerts across devices."}</p>

        <div className="mt-5 flex items-center justify-between gap-3 bg-dark-700/70 border border-white/10 rounded-2xl p-4">
          <div>
            <p className="text-white text-sm font-semibold">Email alerts for new listings</p>
            <p className="text-white/40 text-xs">Get notified when new matches land for your saved searches.</p>
          </div>
          <button
            onClick={() => setEmailAlerts((prev) => !prev)}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${emailAlerts ? "bg-emerald-500 text-white" : "bg-white/10 text-white/70"}`}
          >
            {emailAlerts ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-dark-800 border border-white/10 rounded-3xl p-6">
          <h2 className="font-display text-xl text-white mb-4">Saved homes</h2>
          <div className="space-y-3 max-h-80 overflow-auto pr-1">
            {savedProperties.length ? savedProperties.map((property) => (
              <button key={property.id} onClick={() => onOpenProperty(property)} className="w-full text-left rounded-xl border border-white/10 bg-dark-700/60 p-3 hover:border-brand-500/40 transition-colors">
                <p className="text-white text-sm font-semibold line-clamp-1">{property.title}</p>
                <p className="text-white/45 text-xs mt-1">{property.location}</p>
              </button>
            )) : <p className="text-white/45 text-sm">No saved homes yet.</p>}
          </div>
        </div>

        <div className="bg-dark-800 border border-white/10 rounded-3xl p-6">
          <h2 className="font-display text-xl text-white mb-4">Saved searches</h2>
          <div className="space-y-3 max-h-80 overflow-auto pr-1">
            {savedSearches.length ? savedSearches.map((search) => (
              <div key={search.id} className="rounded-xl border border-white/10 bg-dark-700/60 p-3">
                <p className="text-white text-sm">{search.label}</p>
                <p className="text-white/45 text-xs mt-1">{search.city} · {search.type} · {search.createdAt}</p>
                <button onClick={() => onRemoveSavedSearch(search.id)} className="mt-2 text-xs text-brand-500 hover:text-brand-400">Remove</button>
              </div>
            )) : <p className="text-white/45 text-sm">No saved searches yet.</p>}
          </div>
        </div>

        <div className="bg-dark-800 border border-white/10 rounded-3xl p-6">
          <h2 className="font-display text-xl text-white mb-4">Search history</h2>
          <div className="space-y-3 max-h-80 overflow-auto pr-1">
            {searchHistory.length ? searchHistory.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-white/10 bg-dark-700/60 p-3">
                <p className="text-white text-sm">{entry.query || "General browse"}</p>
                <p className="text-white/45 text-xs mt-1">{entry.city} · {entry.type} · {entry.when}</p>
              </div>
            )) : <p className="text-white/45 text-sm">No search history yet.</p>}
          </div>
        </div>
      </div>

      {recentProperties.length > 0 && (
        <div className="bg-dark-800 border border-white/10 rounded-3xl p-6">
          <h2 className="font-display text-xl text-white mb-4">Recently viewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {recentProperties.map((property) => (
              <button key={property.id} onClick={() => onOpenProperty(property)} className="rounded-xl border border-white/10 overflow-hidden bg-dark-700/60 hover:border-brand-500/40 transition-colors text-left">
                <img src={property.image} alt={property.title} className="w-full h-24 object-cover" />
                <div className="p-3">
                  <p className="text-white text-sm line-clamp-1">{property.title}</p>
                  <p className="text-white/45 text-xs">{property.city}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
