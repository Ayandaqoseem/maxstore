import axios from "axios";

const API_URL = process.env.REACT_APP_API;

// create order
const createOrder = async (formData) => {
  const response = await axios.post(API_URL + "/order", formData, {
    withCredentials: true,
  });
  return response.data.message;
};

// get orders
const getOrders = async () => {
  const response = await axios.get(
    API_URL + "/orders"
    );
    return response.data;
}

const getAllOrders = async () => {
  const response = await axios.get(
    API_URL + "/all-orders"
  );
  return response.data;
}

// get single order
const getOrder = async (id) => {
  const response = await axios.get(
    API_URL + "/order/" + id, {
      withCredentials: true,
    }
  )
  return response.data
}

// update order status
const updateOrderStatus = async(id, formData) => {
  const response = await axios.patch(`${API_URL}/order/${id}`, formData);
  return response.data.message;
}

const orderService = {
  createOrder,
  getOrders,
  getAllOrders,
  getOrder,
  updateOrderStatus,
};


export default orderService;
