export default function OutputForm({ output }) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-lg font-bold mb-4">Output</h2>
        {output ? (
          <p>{output}</p>
        ) : (
          <p className="text-gray-500">No output available.</p>
        )}
      </div>
    );
  }
  