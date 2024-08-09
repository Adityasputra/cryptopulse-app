import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axiosInstance";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function StatisticsPage() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: "/api/coins/api/markets",
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        const sortedData = [...data].sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        );

        const topData = sortedData.slice(0, 10);

        setChartData(transformMarketData(topData));
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const transformMarketData = (data) => {
    if (!data || data.length === 0) return null;

    return {
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: "Price Change Percentage (24h)",
          data: data.map((item) => item.price_change_percentage_24h),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
        },
      ],
    };
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-400">
        Market Statistics
      </h1>
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
      >
        Back to Dashboard
      </button>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg">Loading data...</p>
        </div>
      ) : chartData ? (
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-gray-700">
          <div className="w-full h-72 md:h-96 lg:h-[400px]">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    labels: {
                      color: "#ffffff",
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) =>
                        `${
                          tooltipItem.dataset.label
                        }: ${tooltipItem.raw.toFixed(2)}%`,
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "#ffffff",
                    },
                    grid: {
                      color: "#333333",
                    },
                  },
                  y: {
                    ticks: {
                      color: "#ffffff",
                    },
                    grid: {
                      color: "#333333",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg">No market data available for chart</p>
        </div>
      )}
    </div>
  );
}
