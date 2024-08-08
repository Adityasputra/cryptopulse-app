export default function Watchlist() {
  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Watchlist</h2>
        <div className="mt-4">
          <div className="flex justify-between">
            <span>Bitcoin</span>
            <span>$43,577.00</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Ethereum</span>
            <span>$43,977.00</span>
          </div>
        </div>
      </div>
    </>
  );
}
