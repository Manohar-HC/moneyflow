import { useState, useEffect } from "react";
import { addTransaction, getTransactions } from "../services/transactionService";

export default function Dashboard() {
    const [amount, setAmount] = useState("");
    const [transactions, setTransactions] = useState([]);

    const load = async () => {
        const res = await getTransactions();
        setTransactions(res.data);
    };

    useEffect(() => {
        load();
    }, []);

    const add = async () => {
        await addTransaction({ amount });
        setAmount("");
        load();
    };

    return (
        <div style={{ width: "500px", margin: "50px auto" }}>
            <h2>Dashboard</h2>

            <input
                placeholder="Amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />
            <button onClick={add}>Add</button>

            <ul>
                {transactions.map(t => (
                    <li key={t.id}>{t.amount}</li>
                ))}
            </ul>
        </div>
    );
}