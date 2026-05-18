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

            alert("Please Enter Email and Password");

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

            console.log(response.data);

            if (response.status === 200) {

                localStorage.setItem("user", response.data.email);

                alert("Login Successful");

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