import axios from "axios";
import API from "./api";

export const registerUser = (data) => {
    return axios.post(`${API}/api/auth/register`, data);
};

export const loginUser = (data) => {
    return axios.post(`${API}/api/auth/login`, data);
};