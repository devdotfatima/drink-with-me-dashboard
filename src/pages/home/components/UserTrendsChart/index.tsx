import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const mockData = [
  { month: "Jan", signups: 120, cancellations: 30, upgrades: 50 },
  { month: "Feb", signups: 160, cancellations: 25, upgrades: 60 },
  // ... for all 12 months
];

const UserTrendsChart = () => (
<>
    <h2 className="text-xl font-semibold mb-4">User Trends</h2>
    <LineChart width={1100}  height={300} data={mockData}>
      <CartesianGrid stroke="#eee" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="signups" stroke="#82ca9d" />
      <Line type="monotone" dataKey="cancellations" stroke="#ff6666" />
      <Line type="monotone" dataKey="upgrades" stroke="#8884d8" />
    </LineChart>
  </>
);

export default UserTrendsChart;