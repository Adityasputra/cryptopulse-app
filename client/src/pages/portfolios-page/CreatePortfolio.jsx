import { useState } from "react";
import axios from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";

const CreatePortfolio = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/portfolios", { name, description });
      navigate("/portfolios");
    } catch (error) {
      console.error("Error creating portfolio:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Create New Portfolio</h2>
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
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePortfolio;
