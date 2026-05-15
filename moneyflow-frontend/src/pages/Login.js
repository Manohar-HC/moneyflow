import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API = "https://moneyflow-production-1e66.up.railway.app/api/auth";

const login = async () => {

    if (!email || !password) {
        alert("Enter email and password");
        return;
    }

    try {

        const response = await axios.post(
            `${API}/login`,
            {
                email,
                password,
            }
        );

        if (response.status === 200 && response.data.email) {

            localStorage.setItem("user", response.data.email);

            navigate("/dashboard");

        } else {

            alert("Invalid Login");

        }

    } catch (e) {

        console.log(e);

        alert("Wrong Email or Password");

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