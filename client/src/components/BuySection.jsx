import { useState, useEffect } from "react";
import axios from "../services/axiosInstance";

export default function BuySection() {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [coins, setCoins] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get("/api/coins/data/markets");
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
        setErrorMessage("Failed to load coins. Please try again.");
      }
    };

    fetchCoins();
  }, []);

  const handleBuy = async () => {
    if (!selectedCoin || !quantity) {
      setErrorMessage("Please select a coin and enter a quantity.");
      return;
    }

    try {
      await axios.post("/api/portfolios/buy", {
        coinId: selectedCoin,
        quantity,
      });
      setSuccessMessage("Coin purchased successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error buying coin:", error);
      setErrorMessage("Failed to buy coin. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">Buy Coin</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleBuy();
        }}
      >
        <div className="mb-4">
          <label htmlFor="coin" className="block text-sm font-medium mb-1">
            Coin
          </label>
          <select
            id="coin"
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className="block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          >
            <option value="" disabled>
              Select a coin
            </option>
            {Array.isArray(coins) && coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium mb-1">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            placeholder="Enter quantity"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Buy
        </button>
      </form>
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
      {successMessage && (
        <p className="mt-4 text-green-500">{successMessage}</p>
      )}
    </div>
  );
}
