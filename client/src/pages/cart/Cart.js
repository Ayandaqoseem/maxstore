import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.scss";
import "./Radio.scss";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  getCartDB,
  saveCartDB,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/features/cart/cartSlice";
import Card from "../../components/cards/Card";
import { useEffect } from "react";
import VerifyCoupon from "../../components/verifyCoupon/VerifyCoupon";
import PaymentOptions from "../../components/paymentOptions/PaymentOptions";

export default function Cart() {
  const rawCartItems = useSelector(selectCartItems);
  const cartItems = Array.isArray(rawCartItems) ? rawCartItems : [];
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coupon } = useSelector((state) => state.coupon)


  console.log("cart Total Quantity =>", cartTotalQuantity);
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
    // dispatch(getCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    // );
  };

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };
  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };
  const clearCart = () => {
    dispatch(CLEAR_CART());
    dispatch(saveCartDB({ cartItems: [] }));
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(CALCULATE_SUBTOTAL({ coupon }));
  }, [dispatch, cartItems, coupon]);

  

  return (
    <section>
      <div className={`${styles.container} ${styles.table}`}>
        <h5>Shopping Cart</h5>
        {cartItems?.length === 0 ? (
          <>
            <p>Your cart is empty.</p>
            <div>
              <Link to="/shop">&larr; Back to shop</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { _id, name, photo, price, cartQuantity } = cart;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={photo[0]}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className="--btn"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{price * cartQuantity}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to={"/shop"}>&larr; Continue shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h5>Subtotal:</h5>
                    <h4>{`NGN${cartTotalAmount?.toFixed(2)}`}</h4>
                  </div>
                  <VerifyCoupon />
                  <div className="--underline --m"></div>
                  <PaymentOptions />
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
