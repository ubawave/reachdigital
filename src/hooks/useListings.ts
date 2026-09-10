import { useEffect, useState } from "react";
import { listingsApi } from "../api";
import { LISTINGS, type Listing } from "../data/listings";

export function useListings() {
  const [listings, setListings] = useState<Listing[]>(LISTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    listingsApi
      .list()
      .then((r) => {
        if (active && r.listings.length > 0) setListings(r.listings);
      })
      .catch(() => {
        // Fall back to the bundled static listings if the API is unavailable.
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { listings, loading };
}
