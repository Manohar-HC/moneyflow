import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API = "https://moneyflow-production-1e66.up.railway.app/api/auth";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = async () => {

        if (email.trim() === "" || password.trim() === "") {

            alert("Enter Email and Password");

            return;
        }

        try {

            const response = await axios.post(
                `${API}/login`,
                {
                    email: email,
                    password: password,
                }
            );

            if (response.status === 200) {

                localStorage.setItem("user", email);

                alert("Login Success");

                navigate("/dashboard");

            }

        } catch (error) {

            console.log(error);

            alert("Invalid Email or Password");

        }
    };

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>MoneyFlow Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={login}>
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;