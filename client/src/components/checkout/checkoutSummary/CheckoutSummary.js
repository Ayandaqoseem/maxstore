import { useDispatch, useSelector } from "react-redux";
import styles from "./CheckoutSummary.module.scss";
import { useEffect } from "react";
import { CALCULATE_SUBTOTAL } from "../../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import Card from "../../cards/Card";
import { CartDiscount } from "../../verifyCoupon/VerifyCoupon";

export default function CheckoutSummary() {
  const dispatch = useDispatch();
  const { coupon } = useSelector((state) => state.coupon);
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({ coupon }));
  }, [dispatch, coupon]);
  return (
    <div>
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No item in your cart</p>
            <button className="--btn">
              <Link to="/products">Back to shop</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`cart item(s): ${cartTotalQuantity}`}</b>
            </p>

            <div className={styles.text}>
              <h5>Subtotal:</h5>
              <h4>{cartTotalAmount.toFixed(2)}</h4>
            </div>

            <CartDiscount />

            {cartItems.map((item) => {
              const { _id, name, price, cartQuantity } = item;
              return (
                <Card key={_id} cardClass={styles.card}>
                  <h5>Product: {name}</h5>
                  <p>Quantity: {cartQuantity}</p>
                  <p>Set price: {price * cartQuantity}</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
