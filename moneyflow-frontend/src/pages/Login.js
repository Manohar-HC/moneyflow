
import { loginUser } from "../api";
const login = async () => {
    try {
        const res = await loginUser({ email, password });

        localStorage.setItem("token", res.data);
        window.location = "/dashboard";

    } catch (err) {
        alert("Invalid login");
    }
};useEffect(() => {
    if (localStorage.getItem("token")) {
        window.location = "/dashboard";
    }
}, []);