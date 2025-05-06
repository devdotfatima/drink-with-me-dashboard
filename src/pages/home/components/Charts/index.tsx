import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

type ChartsProps = {
  monthlyData: {
    bookings: number[];
    earnings: number[];
  };
};

const Charts = ({ monthlyData }: ChartsProps) => {
  const { bookings, earnings } = monthlyData;

  const [chartData, setChartData] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Bookings",
        data: bookings,
        backgroundColor: "rgba(75,192,192,0.5)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        yAxisID: "y-axis-bookings", // Tied to bookings y-axis
      },
      {
        label: "Earnings ($)",
        data: earnings,
        backgroundColor: "rgba(255,99,132,0.5)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        yAxisID: "y-axis-earnings", // Tied to earnings y-axis
      },
    ],
  });

  useEffect(() => {
    setChartData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0], // Preserve properties of Bookings dataset
          data: bookings,
        },
        {
          ...prevData.datasets[1],
          data: earnings,
        },
      ],
    }));
  }, [bookings, earnings]);

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-semibold leading-6">
       Active User Analytics
      </h3>
      <div className="chart-container">
        <Line
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Bookings and Earnings Analytics",
              },
              legend: {
                display: true,
              },
            },
            scales: {
              "y-axis-bookings": {
                type: "linear",
                position: "left", // Bookings scale on the left
                title: {
                  display: true,
                  text: "Bookings",
                },
                ticks: {
                  callback: (value) => `${value}`, // Display raw numbers
                },
              },
              "y-axis-earnings": {
                type: "linear",
                position: "right", // Earnings scale on the right
                title: {
                  display: true,
                  text: "Earnings ($)",
                },
                grid: {
                  drawOnChartArea: false, // Prevent overlapping grids
                },
                ticks: {
                  callback: (value) => `$${value}`, // Add dollar sign to earnings
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Charts;
