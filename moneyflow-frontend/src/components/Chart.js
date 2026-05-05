import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

export default function Chart({ data }) {
    const grouped = {};

    data.forEach((t) => {
        const month = new Date().getMonth();
        if (!grouped[month]) grouped[month] = 0;
        grouped[month] += t.amount;
    });

    const chartData = Object.keys(grouped).map((m) => ({
        month: m,
        total: grouped[m]
    }));

    return (
        <LineChart width={400} height={300} data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#00c853" />
        </LineChart>
    );
}