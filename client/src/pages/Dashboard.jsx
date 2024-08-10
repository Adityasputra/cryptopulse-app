import { useState, useEffect } from "react";
import axios from "../services/axiosInstance";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "/api/coins/api/markets",
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        setMarketData(response.data);
      } catch (err) {
        Swal.fire({
          text: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const handleAddToPortfolio = (coin) => {
    let portfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
    if (!portfolio.some((item) => item.id === coin.id)) {
      portfolio.push(coin);
      localStorage.setItem("portfolio", JSON.stringify(portfolio));
      Swal.fire({
        icon: "success",
        title: "Added to Portfolio",
        text: `${coin.name} has been added to your portfolio.`,
        background: "#1f2937",
        color: "#ffffff",
        confirmButtonColor: "#3b82f6",
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Already in Portfolio",
        text: `${coin.name} is already in your portfolio.`,
        background: "#1f2937",
        color: "#ffffff",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-900 text-gray-100">
        <h1 className="text-4xl font-bold mb-8 text-indigo-400">Market Data</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 bg-gray-800 rounded-lg shadow-md">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Market Cap
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Volume (24h)
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Price Change (24h)
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  % Change (24h)
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider"></th>{" "}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {marketData.map((market) => (
                <tr
                  key={market.id}
                  className="hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <img
                      src={market.image}
                      alt={market.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                    {market.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">
                    {market.symbol.toUpperCase()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${market.current_price.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${market.market_cap.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${market.total_volume.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${market.price_change_24h.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {market.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleAddToPortfolio(market)}
                      className="px-4 py-2 mr-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      Add to Portfolio
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
