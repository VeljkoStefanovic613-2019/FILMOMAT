import { useState, useEffect } from "react";

export const useFetch = (apiPath, queryTerm = "") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${process.env.REACT_APP_API_KEY}${
    queryTerm ? `&query=${encodeURIComponent(queryTerm)}` : ""

  }`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        setData(json.results || json.genres || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
