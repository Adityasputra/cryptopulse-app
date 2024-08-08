import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const EditPortfolio = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data } = await axios.get(`/portfolios/${id}`);
        setPortfolio(data);
        setName(data.name);
        setDescription(data.description);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };

    fetchPortfolio();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/portfolios/${id}`, { name, description });
      navigate(`/portfolios/${id}`);
    } catch (error) {
      console.error("Error updating portfolio:", error);
    }
  };

  if (!portfolio) return <p>Loading...</p>;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Edit Portfolio</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-400">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 rounded text-white"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPortfolio;
