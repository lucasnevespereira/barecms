import { useState, useEffect } from "react";
import axios from "axios";
import { Collection } from "@/types";

export function useGetCollections(url: string) {
  const [collections, setCollections] = useState<Collection[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setCollections(response.data.collections);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [url]);

  return { collections, loading, error };
}
