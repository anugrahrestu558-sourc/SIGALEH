import { useEffect, useState } from "react";
import { getCommodityData } from "../services/api";

export default function useCommodityData(city, commodity) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      // const response = await getCommodityData(
      //   city,
      //   commodity
      // );
      const response = await fetch("https://sigaleh-backend.vercel.app/commodities);
      const jsonData = await response.json();

      log("Data yang diterima:", jsonData);

      setData(jsonData);
      setError("");
    } catch (err) {
      setError("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, [city, commodity]);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
  };
}