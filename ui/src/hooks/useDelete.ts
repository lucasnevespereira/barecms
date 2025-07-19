import { useState } from "react";
import apiClient from "@/lib/api";

const useDelete = (url: string, redirectUrl: string) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      setIsDeleting(true);
      setError(null);
      try {
        const res = await apiClient.delete(url);
        if (res.status === 200) {
          window.location.href = redirectUrl;
        } else {
          setError("Failed to delete resource");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to delete resource");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return { isDeleting, error, handleDelete };
};

export default useDelete;
