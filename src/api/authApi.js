import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api",
});

export const login = (data) => {
    return axios.post("http://localhost:8000/api/auth/login",
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        });
}