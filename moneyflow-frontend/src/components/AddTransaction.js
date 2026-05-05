import { useState } from "react";
import API from "../services/api";

export default function AddTransaction({ refresh }) {
    const [amount,setAmount] = useState("");
    const [type,setType] = useState("INCOME");
    const [category,setCategory] = useState("Food");

    const add = async () => {
        await API.post("/transactions", {
            amount,
            type,
            category,
            userId:1
        });

        refresh();
    };

    return (
        <div className="card">
            <h3>Add Transaction</h3>

            <input placeholder="Amount" onChange={e=>setAmount(e.target.value)} /><br/><br/>

            <select onChange={e=>setType(e.target.value)}>
                <option value="INCOME">Income</option>
                <option value="EXPENSE">Expense</option>
            </select><br/><br/>

            <input placeholder="Category" onChange={e=>setCategory(e.target.value)} /><br/><br/>

            <button onClick={add}>Add</button>
        </div>
    );
}