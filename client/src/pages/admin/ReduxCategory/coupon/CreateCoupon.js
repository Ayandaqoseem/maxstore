import { useState } from "react";
import Card from "../../../../components/cards/Card";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "./Coupon.scss"
import toast from "react-hot-toast";
import { createCoupon, getCoupons } from "../../../../redux/features/coupon/couponSlice";

export default function CreateCoupon() {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [expiresAt, setExpiresAt] = useState(new Date());

  const { isLoading } = useSelector((state) => state.coupon);

  const dispatch = useDispatch();

  const saveCoup = async (e) => {
    e.preventDefault();
    if(name.length < 6) {
      return toast.error("Coupon must e 6 in character.")
    }

    if(discount < 1) {
      return toast.error("Discount must be greater than one")
    }

    const formData = {
      name,
      discount,
      expiresAt
    };
    await dispatch(createCoupon(formData));
    await dispatch(getCoupons());
    setName("");
    setDiscount(0);
  }

  return (
    <div className="mt-4">
      <h5>Create Coupon</h5>
      <p>
        Use the form to <b>Create a Category</b>
      </p>
      <div className="card-wrapper">
        <Card cardClass={"card"} className="card-container">
          <form className="p-3" onSubmit={saveCoup}>
            <label className="m-2 d-block">Expiry Date</label>
            <DatePicker
            className="form-control p-3 datePicker-container"
            selected={expiresAt}
              value={expiresAt}
              onChange={(date) => setExpiresAt(date)}
              required
            />
            <label className="m-2">Coupon Name:</label>
            <input
              text="text"
              placeholder="Coupon name"
              className="form-control p-3"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className="m-2">Coupon Discount</label>
            <input
              text="number"
              placeholder="Coupon discount"
              className="form-control p-3"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
            />
            <div>
              <button type="submit" className="--btn --btn-primary mt-3 mb-3">
                Save Coupon
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
