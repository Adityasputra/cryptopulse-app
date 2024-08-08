export default function Portfolio() {
  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md col-span-2 lg:col-span-1">
        <h2 className="text-lg font-bold">My Portfolio</h2>
        <div className="mt-4">
          <div className="flex justify-between">
            <span>Bitcoin</span>
            <span>BTC 0.321476</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Ethereum</span>
            <span>ETH 1.321476</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Dogecoin</span>
            <span>DOGE 13.321476</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Binance Coin</span>
            <span>BNB 2.321476</span>
          </div>
        </div>
      </div>
    </>
  );
}
