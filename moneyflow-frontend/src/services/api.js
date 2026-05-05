import axios from "axios";

const API = axios.create({
    baseURL: "https://moneyflow-production-74de.up.railway.app",
});

export default API;