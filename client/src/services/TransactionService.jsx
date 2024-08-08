import axios from "./axiosInstance";

export const getAllTransactions = async () => {
  const response = await axios.get("/api/transactions");
  return response.data;
};

export const getTransactionById = async (id) => {
  const response = await axios.get(`/api/transactions/${id}`);
  return response.data;
};

export const createTransaction = async (transaction) => {
  const response = await axios.post("/api/transactions", transaction);
  return response.data;
};

export const updateTransaction = async (id, transaction) => {
  const response = await axios.put(`/api/transactions/${id}`, transaction);
  return response.data;
};

export const deleteTransaction = async (id) => {
  await axios.delete(`/api/transactions/${id}`);
};
