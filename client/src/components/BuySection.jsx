export default function BuySection() {
  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Buy</h2>
        <div className="mt-4">
          <div className="flex justify-between">
            <span>Bitcoin Price</span>
            <span>$43,577.00</span>
          </div>
          <div className="mt-4">
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 rounded-lg bg-gray-700 text-white"
            />
          </div>
          <button className="w-full mt-4 bg-purple-600 py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200">
            Buy BTC
          </button>
        </div>
      </div>
    </>
  );
}
