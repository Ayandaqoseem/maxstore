import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API;

export const API_URL = `${BACKEND_URL}/transaction/`;

// Get user transactions

const getUserTransactions = async () => {
  const response = await axios.get(API_URL + "getUserTransactions");
  return response.data;
};

// verify account
const verifyAccount = async (formData) => {
  const response = await axios.post(API_URL + "verifyAccount", formData);
  return response.data;
};

// Transfer fund
const transferFund = async (formData) => {
  const response = await axios.post(API_URL + "transferFund", formData);
  return response.data.message;
};

const transactionService = {
  getUserTransactions,
  verifyAccount,
  transferFund,
};

export default transactionService;
