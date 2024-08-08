export default function Watchlist({ coins }) {
  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Watchlist</h2>
        <div className="mt-4">
          {Array.isArray() && coins.slice(0, 10).map((coin) => (
            <div className="flex justify-between" key={coin.id}>
              <span>{coin.name}</span>
              <span>${coin.current_price.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
