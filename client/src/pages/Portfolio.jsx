import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "../components/Sidebar";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const savedPortfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
    setPortfolio(savedPortfolio);
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-900 text-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-indigo-400">My Portfolio</h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Back to Dashboard
          </button>
        </div>
        {portfolio.length === 0 ? (
          <p className="text-gray-400">Your portfolio is empty.</p>
        ) : (
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {portfolio.map((market) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
