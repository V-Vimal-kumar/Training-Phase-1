import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const api = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });

const AxiosInterceptorProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        setLoading(true);
        config.headers["Authorization"] = `Bearer fakeToken123`;
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        setLoading(false);
        console.log("Response Data:", response.data);
        return response;
      },
      (error) => {
        setLoading(false);
        if (error.response) {
          switch (error.response.status) {
            case 401:
              console.error("Unauthorized: Please log in again.");
              break;
            case 404:
              console.error("Not Found: The requested resource was not found.");
              break;
            case 500:
              console.error("Server Error: Please try again later.");
              break;
            default:
              console.error("An error occurred.");
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return <LoadingContext.Provider value={loading}>{children}</LoadingContext.Provider>;
};

export default AxiosInterceptorProvider;
