import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../features/coinsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { coins, status, error } = useSelector((state) => state.coins);

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <h1 className="text-3xl font-bold mb-4">Digital Currency Dashboard</h1>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coins.map((coin) => (
              <div
                key={coin.id}
                className="p-4 bg-gray-800 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold">{coin.name}</h2>
                <p>Symbol: {coin.symbol}</p>
                <p>Price: ${coin.current_price}</p>
                <p>Market Cap: ${coin.market_cap}</p>
                <p>Volume: ${coin.total_volume}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
