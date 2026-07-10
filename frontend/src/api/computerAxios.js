import axios from "axios";

const computerApi = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/`,
  withCredentials: true,
});

computerApi.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data.message === "Access token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await computerApi.put("/client/computer/refresh");

        return computerApi(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    
    return Promise.reject(error);
  },
);
export default computerApi;
