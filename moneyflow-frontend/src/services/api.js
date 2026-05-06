import axios from "axios";

const api = axios.create({
    baseURL: "https://moneyflow-production-74de.up.railway.app",
});

export default api;