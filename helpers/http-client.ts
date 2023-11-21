import axios from "axios";
import { API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpClient = axios.create({
  baseURL: API_URL,
});

httpClient.interceptors.request.use(
  async function (config) {
    const authToken = await AsyncStorage.getItem("authToken");
    config.headers.Authorization = `Bearer ${authToken ?? ""}`;

    return config;
  },
  function (error) {
    console.log(error);
    Promise.reject(error);
  }
);

export default httpClient;
