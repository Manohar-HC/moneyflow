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

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {

            const response = await axios.post(
                `${API}/register`,
                {
                    name,
                    email,
                    password,
                }
            );

            console.log(response.data);

            alert("Registered Successfully");

        } catch (e) {

            console.log(e);

            alert("Registration Failed");
        }
    };

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

            console.log(response.data);

            localStorage.setItem("user", email);

            alert("Login Successful");

            navigate("/dashboard");

        } catch (e) {

            console.log(e);

            alert("Invalid email or password");
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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