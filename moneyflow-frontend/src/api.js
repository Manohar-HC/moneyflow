import axios from "axios";

const API = axios.create({
    baseURL: "https://moneyflow-production-1e66.up.railway.app/api",
});

export default API;