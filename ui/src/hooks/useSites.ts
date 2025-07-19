import { useState, useEffect } from "react";
import apiClient from "@/lib/api";
import { Site } from "@/types";

interface SitesResponse {
  sites: Site[];
}

export function useSites() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await apiClient.get<SitesResponse>('/sites');
        setSites(response.data.sites);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch sites');
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  return { sites, loading, error };
}
