import { useState } from "react";

export default function InputForm({ prompt }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      prompt(input);
      setInput("");
    } else {
      alert("Please enter a prompt.");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Enter Prompt</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your prompt"
          className="w-full p-2 rounded bg-gray-700 text-white mb-4"
          aria-label="Prompt Input"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 rounded text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
