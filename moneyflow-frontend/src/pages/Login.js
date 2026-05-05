import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = async () => {
        try {
            await API.post("/auth/register", { email, password });
            alert("Registered successfully");
        } catch (err) {
            alert("Error registering");
        }
    };

    const login = async () => {
        try {
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("userId", res.data.id);
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>🔐 Login</h2>

                <input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="btn-group">
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;