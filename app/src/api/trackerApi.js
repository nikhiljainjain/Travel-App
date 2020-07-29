import axios from "axios";
import { AsyncStorage } from "react-native";

const instance = axios.create({
    baseURL: "https://maptrack.herokuapp.com/"
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        config.headers.Authorization = token ? `Bearer ${token}`: null;
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;