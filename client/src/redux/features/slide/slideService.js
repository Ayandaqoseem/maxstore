import axios from "axios";

const API_URL = process.env.REACT_APP_API;

// create slide
const createSlide = async (formData) => {
  const response = await axios.post(API_URL + "/slide", formData, {
    withCredentials: true,
  });
  return response.data;
};

// get slides
const getSlides = async () => {
  const response = await axios.get(API_URL + "/slides");
  return response.data;
};

const slideServices = {
  createSlide,
  getSlides,
};

export default slideServices;
