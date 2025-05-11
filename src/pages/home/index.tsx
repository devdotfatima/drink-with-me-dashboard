import { useEffect, useState } from "react";
import Charts from "./components/Charts";
import Stats from "./components/Stats";
import UserTrendsChart from "./components/UserTrendsChart";
import UserHeatmap from "./components/UserHeatmap";
import UserLeaderboard from "./components/UserLeaderboard";
import {
  fetchMonthlyBookings,
  fetchTotals,
  MonthlyBookingData,
} from "../../api/statsAPI";

const Home = () => {
  const [totals, setTotals] = useState({
    totalRoutes: 0,
    totalLocations: 0,
  });
  const [monthlyData, setMonthlyData] = useState<MonthlyBookingData>({
    bookings: Array(12).fill(0),
    earnings: Array(12).fill(0),
  });
  useEffect(() => {
    const fetchData = async () => {
      const totals = await fetchTotals();
      setTotals(totals);

      const bookingsData = await fetchMonthlyBookings();
      setMonthlyData(bookingsData);
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-16">
      <Stats totals={totals} />
      <Charts monthlyData={monthlyData} />
      <UserTrendsChart />
    <UserHeatmap />
        <UserLeaderboard />
    </div>
  );
};

export default Home;
