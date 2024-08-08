export default function Portfolio({ coins }) {
  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md col-span-2 lg:col-span-1">
        <h2 className="text-lg font-bold">My Portfolio</h2>
        <div className="mt-4">
          {coins.map((coin) => (
            <div className="flex justify-between" key={coin.id}>
              <span>{coin.name}</span>
              <span>
                {coin.symbol.toUpperCase()} {coin.current_price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
