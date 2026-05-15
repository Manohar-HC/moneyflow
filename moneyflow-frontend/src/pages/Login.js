import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API = "https://moneyflow-production-1e66.up.railway.app/api/auth";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const register = async () => {

        try {

            await axios.post(`${API}/register`, {
                name,
                email,
                password,
            });

            alert("Registered Successfully");

        } catch (e) {

            console.log(e);
            alert("Registration Failed");

        }
    };

    const login = async () => {

        try {

            await axios.post(`${API}/login`, {
                email,
                password,
            });

            localStorage.setItem("user", email);

            navigate("/dashboard");

        } catch (e) {

            console.log(e);
            alert("Login Failed");

        }
    };

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>MoneyFlow</h1>

                <p>Smart Finance Management</p>

                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={register}>
                    Register
                </button>

                <button onClick={login}>
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;