import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalAmountExchangeNairaToDoll,
  selectInitialCartTotalAmountExchangeNairaToDoll,
} from "../../redux/features/cart/cartSlice";
import { selectUser } from "../../redux/features/auth/authSlice";
import {
  selectPaymentMethod,
  selectShippingAddress,
} from "../../redux/features/checkout/checkoutSlice";
import { createOrder } from "../../redux/features/order/orderSlice";
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import Card from "../../components/cards/Card";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";

export default function CheckoutPaypal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialOPtions = {
    "client-id": process.env.REACT_APP_PAYPAL_CID,
    currency: "USD",
    intent: "capture",
  };

  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const { coupon } = useSelector((state) => state.coupon);
  
  
  const exchangeRate = process.env.REACT_APP_PAYPAL_EXRATE;
  const cartItemAmountToDollar = cartTotalAmount * exchangeRate;
  const saveOrder = () => {
    const today = new Date();
    const FormData = {
      orderDate: today.toDateString(),
      orderTime: today.toLocaleTimeString(),
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed",
      cartItems,
      shippingAddress,
      paymentMethod,
      coupon: coupon != null ? coupon : { name: "nil" },
    };
    dispatch(createOrder(FormData));
    navigate("/dashboard/user/checkout-success");
  };
  return (
    <div className={styles.paypalCustom}>
      <PayPalScriptProvider options={initialOPtions}>
        <section>
          <div className={`container-fluid ${styles.checkout}`}>
            <form>
              <div>
                <Card cardClass={styles.card}>
                  <CheckoutSummary />
                </Card>
              </div>

              <div>
                <Card cardClass={`${styles.card} ${styles.pay}`}>
                  <h4>Paypal Checkout</h4>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: cartItemAmountToDollar,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        const status = details.status;
                        console.log(details.status);
                        if (status === "COMPLETED") {
                          toast.success("Payment successful.");
                          saveOrder();
                        }
                      });
                    }}
                  />
                </Card>
              </div>
            </form>
          </div>
        </section>
      </PayPalScriptProvider>
    </div>
  );
}
