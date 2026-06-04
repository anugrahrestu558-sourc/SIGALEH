import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "https://sigaleh-backend.vercel.app/dashboard";

export default function useDashboard(
  commodity,
  city
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!commodity || !city) return;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          API_URL,
          {
            params: {
              komoditas: commodity,
              wilayah: city,
            },
          }
        );

        console.log(
          "🔥 API RESPONSE:",
          response.data
        );

        setData(response.data);

      } catch (err) {
        console.error(
          "❌ Dashboard Error:",
          err
        );

        setError(
          err.response?.data?.message ||
          err.message ||
          "Gagal mengambil data dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [commodity, city]);

  return {
    data,
    loading,
    error,
  };
}