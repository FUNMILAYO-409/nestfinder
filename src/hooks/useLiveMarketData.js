import { useEffect, useMemo, useState } from "react";
import { marketStats as fallbackMarketStats, neighborhoodInsights as fallbackNeighborhoodInsights } from "../data";

export default function useLiveMarketData() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      try {
        const response = await fetch("/api/market/overview");

        if (!response.ok) {
          throw new Error("Failed to load market overview");
        }

        const responses = await response.json();

        if (!isActive) return;
        setPayload(responses);
        setError(null);
      } catch (fetchError) {
        if (!isActive) return;
        setPayload({
          marketCards: fallbackMarketStats.map((item) => ({
            label: item.label,
            value: item.value,
            hint: item.hint,
            source: "Fallback market snapshot",
            changeLabel: "Static fallback",
            updatedAt: "Current snapshot",
          })),
          metroDashboards: [],
          neighborhoodDashboards: fallbackNeighborhoodInsights,
          updatedAt: null,
        });
        setError(fetchError);
      } finally {
        if (isActive) setLoading(false);
      }
    };

    load();

    return () => {
      isActive = false;
    };
  }, []);

  const marketCards = useMemo(() => {
    if (!payload?.marketCards?.length) {
      return fallbackMarketStats.map((item) => ({
        label: item.label,
        value: item.value,
        hint: item.hint,
        source: "Loading live market data...",
        changeLabel: loading ? "Updating" : "Static fallback",
        updatedAt: loading ? "Loading" : "Snapshot",
      }));
    }

    return payload.marketCards;
  }, [loading, payload]);

  return {
    marketCards,
    metroDashboards: payload?.metroDashboards ?? [],
    neighborhoodDashboards: payload?.neighborhoodDashboards ?? fallbackNeighborhoodInsights,
    loading,
    error,
    lastUpdated: payload?.updatedAt ?? null,
  };
}