import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    FaWallet,
    FaArrowUp,
    FaArrowDown,
    FaMoneyBill,
} from "react-icons/fa";
import "./Dashboard.css";

const API = "https://moneyflow-production-74de.up.railway.app";

function Dashboard() {
    const [amount, setAmount] = useState("");
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        try {
            const res = await axios.get(`${API}/transactions`);
            setTransactions(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const addTransaction = async () => {
        try {
            await axios.post(`${API}/transactions`, {
                amount,
            });

            setAmount("");
            fetchTransactions();
        } catch (e) {
            alert("Failed");
        }
    };

    const total = transactions.reduce(
        (acc, item) => acc + Number(item.amount),
        0
    );

    const chartData = [
        { name: "Expenses", value: total },
        { name: "Savings", value: total / 2 },
    ];

    const COLORS = ["#6c63ff", "#00c896"];

}

export default Dashboard;