import axios from "axios";

const API = "http://localhost:8080/api";

export const registerUser = (data) =>
    axios.post(API + "/auth/register", data);

export const loginUser = (data) =>
    axios.post(API + "/auth/login", data);

export const getTransactions = (token) =>
    axios.get(API + "/transactions", {
        headers: { Authorization: "Bearer " + token }
    });

export const addTransaction = (data, token) =>
    axios.post(API + "/transactions", data, {
        headers: { Authorization: "Bearer " + token }
    });