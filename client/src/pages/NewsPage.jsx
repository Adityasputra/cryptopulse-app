import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: "https://newsapi.org/v2/everything?q=bitcoin&apiKey=5cd4ca0d0e5d4d27a4175e77c9b7ff9f",
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        console.log(data);
        setNews(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Digital Currency News</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {news.length > 0 ? (
          news.slice(0, 10).map((article, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <img className="" src={article.urlToImage}></img>
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-400 mb-2">{article.date}</p>
              <p>{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 mt-2 block"
              >
                Read more
              </a>
            </div>
          ))
        ) : (
          <p>No news articles available.</p>
        )}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
