import axios from "axios";

const API_URL = process.env.REACT_APP_API;

// create coupon
const createCoupon = async (formData) => {
  const response = await axios.post(
    API_URL + "/coupon", formData, {
    withCredentials: true,
  });
  return response.data;
};

// get Coupons
const getCoupons = async () => {
  const response = await axios.get(
    API_URL +"/coupons"
  );
  return response.data
};

// get Coupon
const getCoupon = async (couponName) => {
  const response = await axios.get(
    API_URL + "/coupon/" + couponName, {
      withCredentials: true
    }
  );
  return response.data;
};

// delete Coupon
const deleteCoupon = async (id) => {
  const response = await axios.delete(API_URL + "/coupon/" + id, {
    withCredentials: true
  });
  return response.data.message;
}

const couponService = {
  createCoupon,
  getCoupons,
  getCoupon,
  deleteCoupon,
};

export default couponService;
