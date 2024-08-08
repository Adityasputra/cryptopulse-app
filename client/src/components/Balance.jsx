export default function Balance() {
  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Total Balance</h2>
        <p className="text-2xl font-semibold">$932,128.00</p>
        <div className="mt-4">
          <div className="flex justify-between">
            <span>Income</span>
            <span className="text-green-500">$1,331.00</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Expenses</span>
            <span className="text-red-500">$324.00</span>
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button className="flex-1 bg-blue-500 py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Receive
          </button>
          <button className="flex-1 bg-green-500 py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
            Send
          </button>
        </div>
      </div>
    </>
  );
}
