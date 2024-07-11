import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_API;

// register
const register = async (userData) => {
  const response = await axios.post(BACKEND_URL + "/register", userData);
  return response.data;
};

// login
const login = async (userData) => {
  const response = await axios.post(BACKEND_URL + "/login", userData);
  return response.data;
};

// logout
const logoutUser = async () => {
  const response = await axios.get(BACKEND_URL + "/logout");
  return response.data.message;
};

// get login status
const getLoginstatus = async () => {
  const response = await axios.get(BACKEND_URL + "/get-login-status");
  return response.data;
};

// get user
const getUser = async() => {
  const response = await axios.get(BACKEND_URL + "/get-user");
  return response.data
}

// update user profile
const updateUser = async (userData) => {
  const response = await axios.patch(BACKEND_URL + "/update-user", userData);
  return response.data
}
// update photo
const updatePhoto = async (userData) => {
  const response = await axios.patch(BACKEND_URL + "/update-photo", userData);
  return response.data
}

// admin check
const authAdminCheck = async() => {
  const response = await axios.get(BACKEND_URL + "/admin-check");
  return response.data
}

// auth check
const authUserCheck = async () => {
  const response = await axios.get(BACKEND_URL + "/auth-check");
  return response.data
} 

const authService = {
  register,
  login,
  getLoginstatus,
  logoutUser,
  authAdminCheck,
  authUserCheck,
  getUser,
  updateUser,
  updatePhoto,
};
export default authService;
