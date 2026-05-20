import React, { useState, useEffect } from "react";
import axios from "axios";

import {
    FaWallet,
    FaArrowUp,
    FaArrowDown,
    FaTrash,
    FaEdit,
    FaHome,
    FaChartPie,
    FaFileAlt,
    FaUser
} from "react-icons/fa";

import "./Dashboard.css";

function Dashboard() {

    const API = "https://moneyflow-production-1e66.up.railway.app/api/transactions";

    const [transactions, setTransactions] = useState([]);

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("");

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const res = await axios.get(API);
            setTransactions(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addTransaction = async () => {

        if (!title || !amount || !category) {
            alert("Fill all fields");
            return;
        }

        try {

            const newTransaction = {
                title,
                amount: parseFloat(amount),
                type,
                category
            };

            await axios.post(API, newTransaction);

            fetchTransactions();

            setTitle("");
            setAmount("");
            setCategory("");

        } catch (error) {
            console.log(error);
        }
    };

    const deleteTransaction = async (id) => {

        try {

            await axios.delete(`${API}/${id}`);

            fetchTransactions();

        } catch (error) {
            console.log(error);
        }
    };

    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, curr) => acc + curr.amount, 0);

    const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = income - expense;

    return (

        <div className="app-layout">

            <div className="sidebar">

                <h2>MoneyFlow</h2>

                <ul>
                    <li>Dashboard</li>
                    <li>Analytics</li>
                    <li>Transactions</li>
                    <li>Reports</li>
                </ul>

            </div>

            <div className="dashboard">

                <h1 className="heading">
                    MoneyFlow Dashboard
                </h1>

                <div className="cards">

                    <div className="card">
                        <FaWallet className="icon" />
                        <h3>Balance</h3>
                        <p>₹ {balance}</p>
                    </div>

                    <div className="card income">
                        <FaArrowUp className="icon" />
                        <h3>Income</h3>
                        <p>₹ {income}</p>
                    </div>

                    <div className="card expense">
                        <FaArrowDown className="icon" />
                        <h3>Expense</h3>
                        <p>₹ {expense}</p>
                    </div>

                </div>

                <div className="form-box">

                    <h2>Add Transaction</h2>

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >

                        <option value="income">
                            Income
                        </option>

                        <option value="expense">
                            Expense
                        </option>

                    </select>

                    <button onClick={addTransaction}>
                        Add Transaction
                    </button>

                </div>

                <div className="transaction-box">

                    <h2>Transactions</h2>

                    {transactions.map((t) => (

                        <div
                            className="transaction"
                            key={t.id}
                        >

                            <div>
                                <h3>{t.title}</h3>
                                <p>{t.category}</p>
                            </div>

                            <div className="right">

                                <h3>
                                    ₹ {t.amount}
                                </h3>

                                <FaTrash
                                    className="delete"
                                    onClick={() => deleteTransaction(t.id)}
                                />

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;