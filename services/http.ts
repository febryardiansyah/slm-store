import axios from "axios";

export const apiToken = (type: "sentinent" | "openRouter" | "nous") =>
  type === "sentinent"
    ? process.env.NEXT_PUBLIC_SENTINENT_TOKEN
    : type === "openRouter"
    ? process.env.NEXT_PUBLIC_OPEN_ROUTER_TOKEN
    : type === "nous"? process.env.NEXT_PUBLIC_NOUS_TOKEN
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
