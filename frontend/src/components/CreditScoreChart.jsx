import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function CreditScoreChart() {

  const data = [
    { month: "Jan", score: 620 },
    { month: "Feb", score: 650 },
    { month: "Mar", score: 680 },
    { month: "Apr", score: 710 },
    { month: "May", score: 740 },
    { month: "Jun", score: 780 }
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "20px",
        marginTop: "30px"
      }}
    >
      <h2>Credit Score Trend</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#7c3aed"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CreditScoreChart;