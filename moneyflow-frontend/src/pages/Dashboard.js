import { useEffect, useState } from "react";
import { getTransactions, addTransaction } from "../api";
import { PieChart, Pie, Cell } from "recharts";
const token = localStorage.getItem("token");
export default function Dashboard(){

    const [data,setData]=useState([]);
    const [amount,setAmount]=useState("");
    const [type,setType]=useState("expense");
    const [category,setCategory]=useState("");
    useEffect(() => {
        getTransactions(token).then(res => setData(res.data));
    }, []);

    useEffect(()=>{
        load();
    },[]);


    const load=()=>{
        getTransactions().then(res=>setData(res.data));
    };

    const add = () => {
        addTransaction({ amount, type, category }, token)
            .then(() => {
                getTransactions(token).then(res => setData(res.data));
            });
    };
    const income = data.filter(d=>d.type==="income")
        .reduce((a,b)=>a+b.amount,0);

    const expense = data.filter(d=>d.type==="expense")
        .reduce((a,b)=>a+b.amount,0);

    return(
        <div className="container">

            <div className="sidebar">
                <h2>MoneyFlow</h2>
            </div>

            <div className="main">

                <h1>Dashboard</h1>

                <div className="card">Income ₹{income}</div>
                <div className="card">Expense ₹{expense}</div>

                <div className="card">
                    <h3>Add Transaction</h3>

                    <input placeholder="Amount"
                           onChange={e=>setAmount(e.target.value)}/>

                    <select onChange={e=>setType(e.target.value)}>
                        <option>income</option>
                        <option>expense</option>
                    </select>

                    <input placeholder="Category"
                           onChange={e=>setCategory(e.target.value)}/>

                    <button onClick={add}>Add</button>
                </div>

                <div className="card">
                    <h3>Chart</h3>

                    <PieChart width={300} height={200}>
                        <Pie data={data} dataKey="amount">
                            {data.map((_,i)=>
                                <Cell key={i} fill={`hsl(${i*60},70%,50%)`} />
                            )}
                        </Pie>
                    </PieChart>

                </div>

            </div>
        </div>
    );
}