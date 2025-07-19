import { useState, useEffect } from "react";
import apiClient from "@/lib/api";
import { Collection } from "@/types";

export function useGetCollections(id: string) {
  const [collections, setCollections] = useState<Collection[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/collections/${id}`);
        setCollections(response.data.collections);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [id]);

  return { collections, loading, error };
}
