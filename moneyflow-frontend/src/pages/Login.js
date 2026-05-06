import { useState } from "react";
import { registerUser, loginUser } from "../services/authService";

export default function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        try {
            await registerUser({ email, password });
            alert("Registered successfully");
        } catch {
            alert("Register failed");
        }
    };

    const login = async () => {
        try {
            const res = await loginUser({ email, password });
            setUser(res.data);
        } catch {
            alert("Login failed");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "100px auto"
    }
};