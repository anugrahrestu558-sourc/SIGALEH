import axios from "axios";

const api = axios.create({
  baseURL: "https://sigaleh-backend.vercel.app/",
});

export default api;