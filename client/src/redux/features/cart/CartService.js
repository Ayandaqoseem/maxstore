import axios from "axios";


export const API_URL = process.env.REACT_APP_API;



// save cart
const saveCartDB = async (cartData) => {
  const response = await axios.patch(API_URL + "/saveCart", cartData, {
    withCredentials: true,
  });
  return response.data;
};

// get cart
const getCartDB = async () => {
  const response = await axios.get(API_URL + "/getCart");
  return response.data;
};

const cartService = {
  saveCartDB,
  getCartDB,
};

export default cartService;
