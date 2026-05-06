import React, { useState } from "react";

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState("");

    const addTransaction = () => {
        if (!amount) return;

        setTransactions([...transactions, amount]);
        setAmount("");
    };

    return (
        <div
            style={{
                background: "#071133",
                minHeight: "100vh",
                color: "white",
                padding: "40px",
                fontFamily: "Arial",
            }}
        >
            <h1>MoneyFlow Dashboard</h1>

            <div style={{ marginTop: "20px" }}>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "250px",
                        borderRadius: "8px",
                        border: "none",
                        marginRight: "10px",
                    }}
                />

                <button
                    onClick={addTransaction}
                    style={{
                        padding: "10px 20px",
                        background: "#6c63ff",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                >
                    Add
                </button>
            </div>

            <ul style={{ marginTop: "30px" }}>
                {transactions.map((item, index) => (
                    <li key={index}>₹ {item}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;