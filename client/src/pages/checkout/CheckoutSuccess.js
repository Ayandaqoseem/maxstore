import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { CLEAR_CART } from "../../redux/features/cart/cartSlice";

export default function CheckoutSuccess() {
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(CLEAR_CART());
  }, [dispatch])
  return (
    <>
    <div>
      <Confetti 
        className="confetti-container"
      />
    </div>
    
      <section className="section-container">
        <div className="container checkout-sucsess-container">
          <h3>Checkout Succceful</h3>
          <p>Thanks for your purchase</p>
          <br />

          <button 
            className="--btn --btn-primary --checkout-success-button"
          >
            <Link 
              to="/dashboard/user/order-history"
              className="--checkout-success-Link"
            >
              View Order Status
            </Link>
          </button>
        </div>
      </section>
    </>
  )
}
