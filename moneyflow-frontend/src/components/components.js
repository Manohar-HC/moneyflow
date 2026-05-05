import { logout } from "../utils/auth";

export default function Topbar() {
    return (
        <div style={{
            background: "#0f172a",
            padding: 15,
            display: "flex",
            justifyContent: "space-between"
        }}>
            <h3>MoneyFlow</h3>
            <button onClick={logout}>Logout</button>
        </div>
    );
}