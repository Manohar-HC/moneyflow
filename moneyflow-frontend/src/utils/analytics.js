import dayjs from "dayjs";

export function analyze(data) {
    let income = 0, expense = 0;

    const category = {};
    const monthly = {};

    data.forEach(t => {
        if (t.type === "INCOME") income += t.amount;
        else expense += t.amount;

        category[t.category] = (category[t.category] || 0) + t.amount;

        const m = dayjs(t.date).format("MMM");
        monthly[m] = (monthly[m] || 0) + t.amount;
    });

    return {
        income,
        expense,
        balance: income - expense,
        categoryData: Object.entries(category).map(([name,value])=>({name,value})),
        monthlyData: Object.entries(monthly).map(([month,value])=>({month,value}))
    };
}

export function aiInsight(data) {
    if (data.length === 0) return "No data yet";

    const total = data.reduce((a,b)=>a+b.amount,0);
    const avg = total / data.length;

    return avg > 3000
        ? "⚠️ Your spending is high. Try reducing expenses."
        : "✅ Your spending is under control.";
}