import axios from "axios";

const token = process.env.NEXT_PUBLIC_SENTINENT_TOKEN;

const http = axios;

http.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    if (config.data.messages) console.log("request", config.data.messages);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
