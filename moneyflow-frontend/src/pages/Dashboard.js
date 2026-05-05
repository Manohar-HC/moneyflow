import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
    const [amount, setAmount] = useState("");
    const [transactions, setTransactions] = useState([]);
    const userId = localStorage.getItem("userId");

    const loadTransactions = async () => {
        const res = await API.get(`/transactions/${userId}`);
        setTransactions(res.data);
    };

    useEffect(() => {
        loadTransactions();
    }, []);

    const addTransaction = async () => {
        await API.post("/transactions/add", {
            userId,
            amount,
        });
        setAmount("");
        loadTransactions();
    };

    return (
        <div className="container">
            <h1>💰 Dashboard</h1>

            <div className="card">
                <h3>Add Transaction</h3>
                <input
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={addTransaction}>Add</button>
            </div>

            <div className="card">
                <h3>Transactions</h3>
                <ul className="list">
                    {transactions.map((t) => (
                        <li key={t.id}>₹ {t.amount}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;