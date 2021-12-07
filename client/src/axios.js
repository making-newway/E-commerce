import axios from "axios";

const token = window.localStorage.getItem("Token");

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
        "Authorization": token ? `Bearer ${token}` : ''
    }
})

export default axiosInstance;

export const publicURl = (filename) => {
    return `http://localhost:5000/public/${filename}`;
}