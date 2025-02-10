import axios from "axios";

export const apiToken = (type: "sentinent" | "openRouter") =>
  type === "sentinent"
    ? process.env.NEXT_PUBLIC_SENTINENT_TOKEN
    : type === "openRouter"
    ? process.env.NEXT_PUBLIC_OPEN_ROUTER_TOKEN
    : "";

const http = axios;

http.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${token("sentinent")}`;
    if (config.data.messages) console.log("request", config.data.messages);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
