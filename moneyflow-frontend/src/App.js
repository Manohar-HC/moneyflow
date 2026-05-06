import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    if (!loggedIn) {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#071739",
                    color: "white",
                    flexDirection: "column",
                }}
            >
                <h1>MoneyFlow Login</h1>

                <input
                    type="text"
                    placeholder="Email"
                    style={{
                        padding: "12px",
                        margin: "10px",
                        width: "250px",
                        borderRadius: "8px",
                        border: "none",
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    style={{
                        padding: "12px",
                        margin: "10px",
                        width: "250px",
                        borderRadius: "8px",
                        border: "none",
                    }}
                />

                <button
                    onClick={handleLogin}
                    style={{
                        padding: "12px 30px",
                        background: "#6C63FF",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginTop: "10px",
                    }}
                >
                    Login
                </button>
            </div>
        );
    }

    return <Dashboard />;
}

export default App;