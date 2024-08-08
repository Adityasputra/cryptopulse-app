import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axiosInstance"; 

export default function HelpApiGemini() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim()) {
      setLoading(true);
      try {
        const { data } = await axios.post("/gemini", { input: question });
        setResponse(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setResponse("An error occurred while fetching data.");
      }
      setLoading(false);
      setQuestion("");
    } else {
      alert("Please enter a question.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">
        Ask Gemini about Digital Currencies
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question about digital currencies"
          rows="4"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 rounded text-white"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {response && (
        <div className="mt-6 w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Response</h3>
          <p>{response}</p>
        </div>
      )}
      <div className="mt-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 bg-gray-600 rounded text-white"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
