import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveAs } from "file-saver";

import axios
    from "axios";
import React, { useState, useEffect } from "react";

import {
    BarChart,
    Bar,
    Legend,
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

    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [darkMode, setDarkMode] = useState(true);
    const [activeMenu, setActiveMenu] = useState("Dashboard");
    const [currentTime, setCurrentTime] = useState(
        new Date()
    );
    useEffect(() => {

        fetchTransactions();

    }, []);
    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentTime(new Date());

        }, 1000);

        return () => clearInterval(timer);

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

            toast.warning("Please fill all fields");

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

                toast.success("Transaction Updated");

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

                toast.success("Transaction Added Successfully");
            }

            console.log("SUCCESS:", response.data);

            fetchTransactions();

            setTitle("");
            setAmount("");

        } catch (error) {

            console.log("POST ERROR:", error);

            toast.error("Error adding transaction");
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

            toast.success("Transaction Deleted");

            fetchTransactions();

        } catch (error) {

            console.log(error);

            toast.error("Delete Failed");
        }
    };
    const exportCSV = () => {

        const headers =
            "Title,Amount,Type,Category\n";

        const rows = transactions.map((t) =>
            `${t.title},${t.amount},${t.type},${t.category}`
        ).join("\n");

        const csv = headers + rows;

        const blob = new Blob(
            [csv],
            { type: "text/csv;charset=utf-8;" }
        );

        saveAs(blob, "transactions.csv");
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

    const filteredTransactions = transactions.filter((t) => {

        const matchesSearch =
            t.title.toLowerCase().includes(search.toLowerCase());

        const matchesType =
            filterType === "all"
                ? true
                : t.type === filterType;

        return matchesSearch && matchesType;
    });
    const pieData = [
        { name: "Income", value: income },
        { name: "Expense", value: expense },
    ];

    const COLORS = ["#6C63FF", "#FF6584"];
    const categoryData = [];

    transactions.forEach((t) => {

        const existing = categoryData.find(
            (c) => c.category === t.category
        );

        if (existing) {

            existing.amount += t.amount;

        } else {

            categoryData.push({
                category: t.category,
                amount: t.amount,
            });
        }
    });
    const chartData = [
        { month: "Jan", value: income * 0.3 },
        { month: "Feb", value: income * 0.5 },
        { month: "Mar", value: income * 0.7 },
        { month: "Apr", value: income * 0.9 },
        { month: "May", value: balance },
    ];

    import { ToastContainer, toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import { saveAs } from "file-saver";

    import axios
        from "axios";
    import React, { useState, useEffect } from "react";

    import {
        BarChart,
        Bar,
        Legend,
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

        const [search, setSearch] = useState("");
        const [filterType, setFilterType] = useState("all");
        const [darkMode, setDarkMode] = useState(true);
        const [activeMenu, setActiveMenu] = useState("Dashboard");
        const [currentTime, setCurrentTime] = useState(
            new Date()
        );
        useEffect(() => {

            fetchTransactions();

        }, []);
        useEffect(() => {

            const timer = setInterval(() => {

                setCurrentTime(new Date());

            }, 1000);

            return () => clearInterval(timer);

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

                toast.warning("Please fill all fields");

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

                    toast.success("Transaction Updated");

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

                    toast.success("Transaction Added Successfully");
                }

                console.log("SUCCESS:", response.data);

                fetchTransactions();

                setTitle("");
                setAmount("");

            } catch (error) {

                console.log("POST ERROR:", error);

                toast.error("Error adding transaction");
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

                toast.success("Transaction Deleted");

                fetchTransactions();

            } catch (error) {

                console.log(error);

                toast.error("Delete Failed");
            }
        };
        const exportCSV = () => {

            const headers =
                "Title,Amount,Type,Category\n";

            const rows = transactions.map((t) =>
                `${t.title},${t.amount},${t.type},${t.category}`
            ).join("\n");

            const csv = headers + rows;

            const blob = new Blob(
                [csv],
                { type: "text/csv;charset=utf-8;" }
            );

            saveAs(blob, "transactions.csv");
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

        const filteredTransactions = transactions.filter((t) => {

            const matchesSearch =
                t.title.toLowerCase().includes(search.toLowerCase());

            const matchesType =
                filterType === "all"
                    ? true
                    : t.type === filterType;

            return matchesSearch && matchesType;
        });
        const pieData = [
            { name: "Income", value: income },
            { name: "Expense", value: expense },
        ];

        const COLORS = ["#6C63FF", "#FF6584"];
        const categoryData = [];

        transactions.forEach((t) => {

            const existing = categoryData.find(
                (c) => c.category === t.category
            );

            if (existing) {

                existing.amount += t.amount;

            } else {

                categoryData.push({
                    category: t.category,
                    amount: t.amount,
                });
            }
        });
        const chartData = [
            { month: "Jan", value: income * 0.3 },
            { month: "Feb", value: income * 0.5 },
            { month: "Mar", value: income * 0.7 },
            { month: "Apr", value: income * 0.9 },
            { month: "May", value: balance },
        ];

        return (

            <div className={darkMode ? "app-layout dark" : "app-layout light"}>

                <div className="sidebar">

                    <h2>MoneyFlow</h2>

                    <ul>
                        <li
                            className={
                                activeMenu === "Dashboard"
                                    ? "active-menu"
                                    : ""
                            }
                            onClick={() => setActiveMenu("Dashboard")}
                        >
                            Dashboard
                        </li>

                        <li
                            className={
                                activeMenu === "Analytics"
                                    ? "active-menu"
                                    : ""
                            }
                            onClick={() => setActiveMenu("Analytics")}
                        >
                            Analytics
                        </li>

                        <li
                            className={
                                activeMenu === "Transactions"
                                    ? "active-menu"
                                    : ""
                            }
                            onClick={() => setActiveMenu("Transactions")}
                        >
                            Transactions
                        </li>

                        <li
                            className={
                                activeMenu === "Reports"
                                    ? "active-menu"
                                    : ""
                            }
                            onClick={() => setActiveMenu("Reports")}
                        >
                            Reports
                        </li>

                        <li onClick={logout}>
                            Logout
                        </li>
                    </ul>

                </div>
                <div className="mobile-navbar">

                    <h2>MoneyFlow</h2>

                    <button onClick={logout}>
                        Logout
                    </button>

                </div>
                <div className="dashboard">


                    <h1 className="heading">MoneyFlow Dashboard</h1>
                    <div className="hero-section">

                        <div>

                            <h1 className="hero-title">
                                Welcome Back 👋
                            </h1>

                            <p className="hero-subtitle">
                                Track your money smarter with AI-powered insights.
                            </p>

                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px"
                            }}
                        >

                            <div className="hero-badge">
                                💎 Premium Analytics
                            </div>

                            <div className="time-box">

                                <h2>
                                    {currentTime.toLocaleTimeString()}
                                </h2>

                                <p>
                                    {currentTime.toDateString()}
                                </p>

                            </div>

                        </div>

                    </div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        style={{
                            padding: "12px 18px",
                            background: darkMode ? "#ffffff" : "#111827",
                            color: darkMode ? "#111827" : "#ffffff",
                            border: "none",
                            borderRadius: "12px",
                            marginBottom: "20px",
                            cursor: "pointer",
                            marginRight: "15px"
                        }}
                    >
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <button
                        onClick={exportCSV}
                        style={{
                            padding: "12px 18px",
                            background: "#6C63FF",
                            color: "white",
                            border: "none",
                            borderRadius: "12px",
                            marginBottom: "20px",
                            cursor: "pointer"
                        }}
                    >
                        Export CSV
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
                            <div className="cards">

                                <div
                                    className="card"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#667eea,#764ba2)"
                                    }}
                                >
                                    <h3>Total Balance</h3>
                                    <p>₹ {balance}</p>
                                </div>

                                <div
                                    className="card"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#11998e,#38ef7d)"
                                    }}
                                >
                                    <h3>Total Income</h3>
                                    <p>₹ {income}</p>
                                </div>

                                <div
                                    className="card"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#fc466b,#3f5efb)"
                                    }}
                                >
                                    <h3>Total Expense</h3>
                                    <p>₹ {expense}</p>
                                </div>

                            </div>
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

                            <h2>Category Analytics</h2>

                            <ResponsiveContainer width="100%" height={300}>

                                <BarChart data={categoryData}>

                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis dataKey="category" />

                                    <YAxis />

                                    <Tooltip />

                                    <Legend />

                                    <Bar
                                        dataKey="amount"
                                        fill="#6C63FF"
                                        radius={[10,10,0,0]}
                                    />

                                </BarChart>

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
                    <div className="chart-box">

                        <h2>Recent Activity</h2>

                        {transactions.slice(0, 5).map((t) => (

                            <div
                                key={t.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: "15px",
                                    padding: "12px",
                                    borderRadius: "12px",
                                    background: "rgba(255,255,255,0.05)"
                                }}
                            >

                                <div>
                                    <strong>{t.title}</strong>
                                    <p>{t.category}</p>
                                </div>

                                <div
                                    style={{
                                        color:
                                            t.type === "income"
                                                ? "#00ffae"
                                                : "#ff4d6d"
                                    }}
                                >
                                    ₹ {t.amount}
                                </div>

                            </div>

                        ))}

                    </div>
                    <div className="form-box">

                        <input
                            type="text"
                            placeholder="Search Transaction"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >

                            <option value="all">All</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>

                        </select>

                    </div>
                    <div className="cards">

                        <div
                            className="card"
                            style={{ cursor: "pointer" }}
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            <h3>➕ Add Expense</h3>
                            <p>Quick Add</p>
                        </div>

                        <div
                            className="card"
                            style={{ cursor: "pointer" }}
                            onClick={exportCSV}
                        >
                            <h3>📤 Export Data</h3>
                            <p>Download CSV</p>
                        </div>

                        <div
                            className="card"
                            style={{ cursor: "pointer" }}
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            <h3>🌙 Theme</h3>
                            <p>Switch Mode</p>
                        </div>

                    </div>
                    <div className="chart-box">

                        <h2>Financial Summary</h2>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                                marginTop: "20px"
                            }}
                        >

                            <div
                                style={{
                                    padding: "15px",
                                    borderRadius: "12px",
                                    background: "rgba(255,255,255,0.06)"
                                }}
                            >
                                💰 You saved <strong>{savingsRate}%</strong> of your income.
                            </div>

                            <div
                                style={{
                                    padding: "15px",
                                    borderRadius: "12px",
                                    background: "rgba(255,255,255,0.06)"
                                }}
                            >
                                📈 Total Income: <strong>₹ {income}</strong>
                            </div>

                            <div
                                style={{
                                    padding: "15px",
                                    borderRadius: "12px",
                                    background: "rgba(255,255,255,0.06)"
                                }}
                            >
                                📉 Total Expense: <strong>₹ {expense}</strong>
                            </div>

                            <div
                                style={{
                                    padding: "15px",
                                    borderRadius: "12px",
                                    background: "rgba(255,255,255,0.06)"
                                }}
                            >
                                🧾 Total Transactions:
                                <strong> {totalTransactions}</strong>
                            </div>

                        </div>

                    </div>
                    <div className="transaction-box">

                        <h2>Transactions</h2>

                        {filteredTransactions.length === 0 ? (

                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "50px",
                                    opacity: 0.7
                                }}
                            >

                                <h2>No Transactions Yet</h2>

                                <p>
                                    Start adding your income and expenses 🚀
                                </p>

                            </div>

                        ) : (

                            filteredTransactions.map((t) => (

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

                            ))

                        )}

                    </div>
                    <button
                        className="fab-button"
                        onClick={() => window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        })}
                    >
                        +
                    </button>
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        theme="dark"
                    />

                </div>

            </div>
        );
    }

    export default Dashboard;

export default Dashboard;