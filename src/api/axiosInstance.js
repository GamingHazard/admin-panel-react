import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const useAxiosInstance = () => {
    const { token } = useAuth();

    const instance = axios.create({
        baseURL: 'http://localhost:5000/api',
    });

    instance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return instance;
};

export default useAxiosInstance;
