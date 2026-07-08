import axios from "axios";

const sessionApi = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/`,
  withCredentials: true,
});

sessionApi.interceptors.response.use(
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
        await sessionApi.put("/client/session/refresh");

        return sessionApi(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
export default sessionApi;
