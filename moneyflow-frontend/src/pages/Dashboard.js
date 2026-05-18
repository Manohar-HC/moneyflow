import axios from "axios";
import React, { useState, useEffect } from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

import {
    FaWallet,
    FaArrowUp,
    FaArrowDown,
    FaTrash,
    FaEdit,
} from "react-icons/fa";

import "./Dashboard.css";
import { motion } from "framer-motion";

function Dashboard() {

    const API = "https://moneyflow-production-1e66.up.railway.app/api/transactions";

    const [transactions, setTransactions] = useState([]);

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("Salary");
    const [editId, setEditId] = useState(null);


    useEffect(() => {

        fetchTransactions();

    }, []);

    const fetchTransactions = async () => {

        try {

            const res = await axios.get(API);

            setTransactions(res.data);

        } catch (error) {

            console.log("GET ERROR:", error);

        }
    };

    const addTransaction = async () => {

        if (!title || !amount) {

            alert("Please fill all fields");

            return;
        }

        try {

            const transactionData = {
                title: title,
                amount: parseFloat(amount),
                type: type,
                category: category,
            };

            let response;

            if (editId) {

                response = await axios.put(
                    `${API}/${editId}`,
                    transactionData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                alert("Transaction Updated");

                setEditId(null);

            } else {

                response = await axios.post(
                    API,
                    transactionData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                alert("Transaction Added Successfully");
            }

            console.log("SUCCESS:", response.data);

            fetchTransactions();

            setTitle("");
            setAmount("");

        } catch (error) {

            console.log("POST ERROR:", error);

            alert("Error adding transaction");
        }
    };
    const editTransaction = (transaction) => {

        setTitle(transaction.title);

        setAmount(transaction.amount);

        setType(transaction.type);

        setCategory(transaction.category);

        setEditId(transaction.id);
    };



    const deleteTransaction = async (id) => {

        try {

            await axios.delete(`${API}/${id}`);

            fetchTransactions();

        } catch (error) {

            console.log(error);

        }
    };

    const logout = () => {

        localStorage.removeItem("user");

        window.location.href = "/";
    };

    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = income - expense;
    const savingsRate =
        income > 0
            ? ((balance / income) * 100).toFixed(1)
            : 0;

    const totalTransactions = transactions.length;

    const expensePercentage =
        income > 0
            ? ((expense / income) * 100).toFixed(1)
            : 0;


    const pieData = [
        { name: "Income", value: income },
        { name: "Expense", value: expense },
    ];

    const COLORS = ["#6C63FF", "#FF6584"];

    const chartData = [
        { month: "Jan", value: income * 0.3 },
        { month: "Feb", value: income * 0.5 },
        { month: "Mar", value: income * 0.7 },
        { month: "Apr", value: income * 0.9 },
        { month: "May", value: balance },
    ];

    return (

        <div className="dashboard">

            <h1 className="heading">MoneyFlow Dashboard</h1>

            <button
                onClick={logout}
                style={{
                    padding: "10px 20px",
                    marginBottom: "20px",
                    background: "#ff4d4f",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}
            >
                Logout
            </button>

            <motion.div
                className="cards"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >

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

            </motion.div>


            <div className="cards">

                <div className="card">
                    <h3>Total Transactions</h3>
                    <p>{totalTransactions}</p>
                </div>

                <div className="card income">
                    <h3>Savings Rate</h3>
                    <p>{savingsRate}%</p>
                </div>

                <div className="card expense">
                    <h3>Expense Ratio</h3>
                    <p>{expensePercentage}%</p>
                </div>

            </div>

            <div className="chart-container">

                <div className="chart-box">

                    <h2>Income vs Expense</h2>

                    <ResponsiveContainer width="100%" height={300}>

                        <PieChart>

                            <Pie
                                data={pieData}
                                dataKey="value"
                                outerRadius={100}
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

                <div className="chart-box">

                    <h2>Monthly Overview</h2>

                    <ResponsiveContainer width="100%" height={300}>

                        <LineChart data={chartData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="month" />

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

            </div>

            <div className="form-box">

                <h2>Add Transaction</h2>

                <input
                    type="text"
                    placeholder="Transaction Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >

                    <option value="income">Income</option>
                    <option value="expense">Expense</option>

                </select>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >

                    <option>Salary</option>
                    <option>Rent</option>
                    <option>Shopping</option>
                    <option>Food</option>
                    <option>Investment</option>

                </select>

                <button onClick={addTransaction}>
                    {editId ? "Update Transaction" : "Add Transaction"}
                </button>

            </div>

            <div className="transaction-box">

                <h2>Transactions</h2>

                {transactions.map((t) => (

                    <motion.div
                        key={t.id}
                        className={`transaction ${t.type}`}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >

                        <div>

                            <h3>{t.title}</h3>

                            <p>{t.category}</p>

                        </div>

                        <div className="right">

                            <h3>
                                {t.type === "income" ? "+" : "-"}₹ {t.amount}
                            </h3>

                            <FaEdit
                                className="delete"
                                onClick={() => editTransaction(t)}
                                style={{
                                    marginRight: "15px",
                                    cursor: "pointer",
                                    color: "#6C63FF"
                                }}
                            />

                            <FaTrash
                                className="delete"
                                onClick={() => deleteTransaction(t.id)}
                            />

                        </div>

                    </motion.div>

                ))}

            </div>

        </div>
    );
}

export default Dashboard;