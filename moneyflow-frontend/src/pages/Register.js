import { useState } from "react";
import axios from "axios";

const API = "https://moneyflow-production-74de.up.railway.app/api/auth";

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {

        try {

            await axios.post(`${API}/register`, {
                email,
                password,
            });

            alert("Registered Successfully");

            window.location.href = "/";

        } catch (err) {

            console.log(err);

            alert("Register Failed");

        }
    };

    return (

        <div style={{ padding: 40 }}>

            <h2>Register</h2>

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleRegister}>
                Register
            </button>

        </div>
    );
}

export default Register;