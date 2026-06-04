import api from "../api/axios";

export const getDashboardData = async (
  komoditas,
  wilayah
) => {

  const response = await api.get("/dashboard", {
    params: {
      komoditas,
      wilayah,
    },
  });

  return response.data;
};