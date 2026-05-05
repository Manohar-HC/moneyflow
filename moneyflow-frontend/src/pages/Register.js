import { useNavigate } from "react-router-dom";

export default function Register(){
    const nav = useNavigate();

    return(
        <div className="auth-container">
            <div className="auth-box">
                <h2>Create Account</h2>

                <input placeholder="Email"/>
                <input placeholder="Password"/>

                <button onClick={()=>nav("/")}>Register</button>
            </div>
        </div>
    );
}