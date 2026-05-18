import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = () => {

        if (email.trim() === "" || password.trim() === "") {

            alert("Enter Email and Password");

            return;
        }

        localStorage.setItem("user", email);

        alert("Login Success");

        navigate("/dashboard");
    };

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>MoneyFlow</h1>

                <p>Smart Finance Management</p>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
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