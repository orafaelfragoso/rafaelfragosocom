import { useState, useEffect } from "react";

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: any;
}

export const useApi = <T>(apiEndpoint: string): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint);
        const result: T = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  return { data, loading, error };
};
