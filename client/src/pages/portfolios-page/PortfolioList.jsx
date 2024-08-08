export default function PortfolioList({ portfolios }) {
  return (
    <div className="bg-gray-800 p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">My Portfolios</h2>
      <ul>
        {portfolios.map((portfolio) => (
          <li key={portfolio.id} className="mb-4">
            <h3 className="text-lg font-semibold">{portfolio.name}</h3>
            <ul>
              {portfolio.PortfolioItems.map((item) => (
                <li key={item.id} className="text-sm text-gray-400">
                  {item.coinName} - {item.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
