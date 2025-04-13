import { useState, useEffect } from "react";
import axios from "axios";

const cache = new Map();

const UseAxios = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    if (!forceRefresh && cache.has(url)) {
      setData(cache.get(url));
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(url, options);
      cache.set(url, response.data);
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData();
    return () => controller.abort();
  }, [url, options]);

  return { data, loading, error, refetch: () => fetchData(true) };
};

export default UseAxios;
