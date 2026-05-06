import React from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
    const isLoggedIn = localStorage.getItem("user");

    return (
        <div>
            {isLoggedIn ? <Dashboard /> : <Login />}
        </div>
    );
}

export default App;