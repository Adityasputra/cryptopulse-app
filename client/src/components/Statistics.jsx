import PriceChart from "./PriceChart";

export default function Statistics({ marketData }) {
  const transformMarketData = (data) => {
    if (!data || data.length === 0) return null;

    return {
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: "Current Price",
          data: data.map((item) => item.price_change_percentage_24h),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = transformMarketData(marketData.slice(0, 10));

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Statistics</h2>
      {chartData ? (
        <PriceChart data={chartData} />
      ) : (
        <p>No market data available for chart</p>
      )}
    </div>
  );
}
