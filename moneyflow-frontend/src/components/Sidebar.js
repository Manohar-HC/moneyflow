import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div style={{
            width:240,
            height:"100vh",
            padding:20,
            background:"#020617",
            borderRight:"1px solid rgba(255,255,255,0.05)"
        }}>
            <h2 style={{marginBottom:30}}>💎 MoneyFlow</h2>

            <Link to="/dashboard" style={{display:"block",marginBottom:10}}>
                Dashboard
            </Link>
        </div>
    );
}