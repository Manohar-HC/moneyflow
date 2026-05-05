import axios from "axios";
import API from "./api";

export const addTransaction = (data) => {
    return axios.post(`${API}/api/transactions`, data, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
};

export const getTransactions = () => {
    return axios.get(`${API}/api/transactions`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
};