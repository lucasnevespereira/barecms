import { useState, useEffect } from "react";
import apiClient from "@/lib/api";
import { Collection, Entry, Site } from "@/types";

interface CollectionDetailData {
  collection: Collection;
  entries: Entry[];
  site: Site;
}

export function useCollectionDetail(
  collectionId: string | undefined,
  siteId: string | undefined
) {
  const [data, setData] = useState<CollectionDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collectionId || !siteId) {
      setError("Collection ID and Site ID are required");
      setLoading(false);
      return;
    }

    const fetchCollectionDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch collection, entries, and site info in parallel
        const [collectionResponse, entriesResponse, siteResponse] = await Promise.all([
          apiClient.get(`/collections/${collectionId}`),
          apiClient.get(`/collections/${collectionId}/entries`),
          apiClient.get(`/sites/${siteId}`)
        ]);

        setData({
          collection: collectionResponse.data,
          entries: entriesResponse.data,
          site: siteResponse.data.site
        });
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch collection details');
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionDetail();
  }, [collectionId, siteId]);

  return {
    collection: data?.collection || null,
    entries: data?.entries || [],
    site: data?.site || null,
    loading,
    error
  };
}
