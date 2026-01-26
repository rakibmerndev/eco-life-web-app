import axios from "axios";

export const axiosPublic = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "production"
      ? import.meta.env.VITE_API_BASE_URL
      : "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
