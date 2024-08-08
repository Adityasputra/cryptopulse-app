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
  const navigate = useNavigate(); // Hook untuk navigasi

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Use data dummy here for testing
        const dummyData = [
          { name: "Bitcoin", price_change_percentage_24h: 5.23 },
          { name: "Ethereum", price_change_percentage_24h: -2.15 },
          { name: "Ripple", price_change_percentage_24h: 3.56 },
          { name: "Litecoin", price_change_percentage_24h: 1.78 },
          { name: "Cardano", price_change_percentage_24h: -0.45 },
        ];
        setChartData(transformMarketData(dummyData));
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
          backgroundColor: "rgba(30, 144, 255, 0.6)",
          borderColor: "rgba(30, 144, 255, 1)",
          borderWidth: 2,
        },
      ],
    };
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-400">
        Market Statistics
      </h1>
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md"
      >
        Kembali ke Dashboard
      </button>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg">Loading data...</p>
        </div>
      ) : chartData ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
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
                        `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`,
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
