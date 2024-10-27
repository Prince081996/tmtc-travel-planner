import axios from "axios";
import { signOut } from "next-auth/react";
import Toaster from "./Toaster/toaster";

const axiosInstance = axios.create({
  baseURL: "https://",
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful response
    if (response?.status === 200) {
      return response;
    }
   
  },
  (error) => {
    // Handle error response
    if (error.response.statusText === "Unauthorized") {
      // Server responded with a status other than 2xx
      signOut();
      Toaster("error", error.response.data.message);
    } else if (error.request) {
      // No response was received from the server
      Toaster("error",`${error?.response?.data?.message}`);
    } else {
      // Something happened while setting up the request
      Toaster("error", `Request error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
