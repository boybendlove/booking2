import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;  // Flag to track if component is mounted

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/${endpoint}`);
        if (isMounted) {
          setData(Array.isArray(res.data) ? res.data : []);
        }
      } catch (err) {
        setError(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;  // Clean up by setting mounted flag to false
    };
  }, [endpoint]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/${endpoint}`);
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
