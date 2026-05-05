import { logout } from "../utils/auth";

export default function Topbar() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 20
        }}>
            <h2 className="gradient-text">Dashboard</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
}