import { useState, useEffect } from "react";
import apiClient from "@/lib/api";
import { Site, Collection } from "@/types";

interface SiteDetailData {
  site: Site;
  collections: Collection[];
}

export function useSiteDetail(siteId: string | undefined) {
  const [data, setData] = useState<SiteDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteId) {
      setError("Site ID is required");
      setLoading(false);
      return;
    }

    const fetchSiteDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both site and collections in parallel
        const [siteResponse, collectionsResponse] = await Promise.all([
          apiClient.get(`/sites/${siteId}`),
          apiClient.get(`/sites/${siteId}/collections`)
        ]);

        setData({
          site: siteResponse.data.site,
          collections: collectionsResponse.data.collections
        });
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch site details');
      } finally {
        setLoading(false);
      }
    };

    fetchSiteDetail();
  }, [siteId]);

  return {
    site: data?.site || null,
    collections: data?.collections || [],
    loading,
    error
  };
}
