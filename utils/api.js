import axios from "axios";
const apiUrl = "/api";

const api = axios.create({
  baseURL: `${apiUrl}`,
  timeout: 30000,
  headers: { "X-Custom-Header": "Ytdl" },
});

export default api;
