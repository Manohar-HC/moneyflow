import API from "./api";

export const addTransaction = (data) => API.post("/transactions", data);
export const getTransactions = () => API.get("/transactions");