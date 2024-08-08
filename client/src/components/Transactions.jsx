import { useEffect, useState } from "react";
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/TransactionService";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [form, setForm] = useState({ userId: "", coinId: "", amount: "" });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSelectTransaction = async (id) => {
    try {
      const data = await getTransactionById(id);
      setSelectedTransaction(data);
      setForm({
        userId: data.userId,
        coinId: data.coinId,
        amount: data.amount,
      });
      setIsEdit(true);
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateTransaction(selectedTransaction.id, form);
      } else {
        await createTransaction(form);
      }
      fetchTransactions();
      setForm({ userId: "", coinId: "", amount: "" });
      setIsEdit(false);
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="userId" className="block text-sm font-medium mb-1">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            value={form.userId}
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
            className="block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            placeholder="Enter user ID"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="coinId" className="block text-sm font-medium mb-1">
            Coin ID
          </label>
          <input
            type="text"
            id="coinId"
            value={form.coinId}
            onChange={(e) => setForm({ ...form, coinId: e.target.value })}
            className="block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            placeholder="Enter coin ID"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            placeholder="Enter amount"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isEdit ? "Update" : "Create"} Transaction
        </button>
      </form>

      <div className="bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">All Transactions</h3>
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-2 mb-2 bg-gray-700 rounded flex justify-between items-center"
          >
            <div>
              <p>
                <strong>ID:</strong> {transaction.id}
              </p>
              <p>
                <strong>User ID:</strong> {transaction.User.id}
              </p>
              <p>
                <strong>Coin ID:</strong> {transaction.Coin.id}
              </p>
              <p>
                <strong>Amount:</strong> {transaction.amount}
              </p>
            </div>
            <div>
              <button
                onClick={() => handleSelectTransaction(transaction.id)}
                className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(transaction.id)}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
