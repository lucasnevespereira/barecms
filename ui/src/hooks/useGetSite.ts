import { useState, useEffect } from "react";
import axios from "axios";
import { Site } from "@/types";

export function useGetSite(url: string) {
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSite = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setSite(response.data.site);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSite();
  }, [url]);

  return { site, loading, error };
}
