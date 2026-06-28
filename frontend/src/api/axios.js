import axios from "axios";

const api = axios.create({
    baseUrl: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

//this is for recieving responce
api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                await api.post("/login/refresh");

                return api(originalRequest);

            } catch (err) {
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);
export default api;