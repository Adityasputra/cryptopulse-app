import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../services/axiosInstance";
import Swal from "sweetalert2";

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `/api/coins/api/${id}`,
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        setCoin(response.data);
      } catch (err) {
        Swal.fire({
          text: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [id]);

  if (loading) return <p className="text-gray-400">Loading...</p>;

  if (!coin) return <p className="text-gray-400">Coin not found</p>;

  return (
    <div className="p-6 bg-gray-900 text-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-indigo-400">{coin.name}</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-24 h-24 rounded-full mb-4"
        />
        <p className="text-lg text-gray-300">
          <strong>Symbol:</strong> {coin.symbol.toUpperCase()}
        </p>
        <p className="text-lg text-gray-300">
          <strong>Current Price:</strong> ${coin.current_price.toLocaleString()}
        </p>
        <p className="text-lg text-gray-300">
          <strong>Market Cap:</strong> ${coin.market_cap.toLocaleString()}
        </p>
        <p className="text-lg text-gray-300">
          <strong>Volume (24h):</strong> ${coin.total_volume.toLocaleString()}
        </p>
        <p className="text-lg text-gray-300">
          <strong>Price Change (24h):</strong> ${coin.price_change_24h.toLocaleString()}
        </p>
        <p className="text-lg text-gray-300">
          <strong>% Change (24h):</strong> {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default CoinDetails;
