import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://backendevangadiforum-6s8g.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosBase;
