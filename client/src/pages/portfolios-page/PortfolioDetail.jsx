import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import { useParams, Link } from "react-router-dom";

const PortfolioDetail = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data } = await axios.get(`/portfolios/${id}`);
        setPortfolio(data);
        setItems(data.PortfolioItems);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (!portfolio) return <p>Loading...</p>;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Portfolio: {portfolio.name}</h2>
      <p>{portfolio.description}</p>
      <h3 className="text-md font-semibold mt-4">Items:</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-2">
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <Link
        to={`/portfolios/${portfolio.id}/edit`}
        className="text-blue-500 hover:underline"
      >
        Edit Portfolio
      </Link>
    </div>
  );
};

export default PortfolioDetail;
