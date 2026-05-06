import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import {
    FaWallet,
    FaArrowUp,
    FaArrowDown,
    FaMoneyBill,
} from "react-icons/fa";

import "./Dashboard.css";

function Dashboard() {
    const [transactions, setTransactions] = useState([]);

    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");

    const addTransaction = () => {
        if (!text || !amount) return;

        const newTransaction = {
            id: Date.now(),
            text,
            amount: parseFloat(amount),
            type: amount > 0 ? "income" : "expense",
        };

        setTransactions([...transactions, newTransaction]);
        setText("");
        setAmount("");
    };

    const income = transactions
        .filter((t) => t.amount > 0)
        .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
        .filter((t) => t.amount < 0)
        .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    const balance = income - expense;

    const chartData = [
        { name: "Jan", value: 4000 },
        { name: "Feb", value: 3000 },
        { name: "Mar", value: 5000 },
        { name: "Apr", value: 4000 },
        { name: "May", value: 7000 },
    ];

    const pieData = [
        { name: "Income", value: income },
        { name: "Expense", value: expense },
    ];

    const COLORS = ["#6C63FF", "#FF6584"];

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <h2>MoneyFlow</h2>

                <ul>
                    <li>Dashboard</li>
                    <li>Analytics</li>
                    <li>Transactions</li>
                    <li>Profile</li>
                </ul>
            </aside>

            <main className="main-content">
                <h1>Financial Dashboard</h1>

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

                    <div className="card savings">
                        <FaMoneyBill className="icon" />
                        <h3>Savings</h3>
                        <p>₹ {balance}</p>
                    </div>
                </div>

                <div className="charts">
                    <div className="chart-box">
                        <h2>Monthly Overview</h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#6C63FF"
                                    strokeWidth={3}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-box">
                        <h2>Income vs Expense</h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="transaction-box">
                    <h2>Add Transaction</h2>

                    <div className="form">
                        <input
                            type="text"
                            placeholder="Transaction Name"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Amount (+income, -expense)"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <button onClick={addTransaction}>Add</button>
                    </div>

                    <ul className="transaction-list">
                        {transactions.map((t) => (
                            <li key={t.id} className={t.amount > 0 ? "plus" : "minus"}>
                                {t.text}
                                <span>
                  {t.amount > 0 ? "+" : "-"}₹ {Math.abs(t.amount)}
                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;