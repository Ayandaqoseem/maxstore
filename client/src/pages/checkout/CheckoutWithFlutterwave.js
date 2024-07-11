import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/cards/Card";
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import { useNavigate, useSearchParams } from "react-router-dom";
import { selectCartItems, selectCartTotalAmount } from "../../redux/features/cart/cartSlice";
import { selectUser } from "../../redux/features/auth/authSlice";
import { selectPaymentMethod, selectShippingAddress } from "../../redux/features/checkout/checkoutSlice";
import { createOrder } from "../../redux/features/order/orderSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function CheckoutWithFlutterwave() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const { coupon } = useSelector((state) => state.coupon);

  console.log("USER", user);
  console.log("NEWUSER", user?.newUser?.email);

  const [urlParams] = useSearchParams()
  const payment = urlParams.get("payment")
  const ref = urlParams.get("ref")



  const saveOrder = () => {
    const today = new Date()
    const FormData = {
      orderDate: today.toDateString(),
      orderTime: today.toLocaleTimeString(),
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed",
      cartItems,
      shippingAddress,
      paymentMethod,
      coupon: coupon != null ? coupon : { name: "nil" },
    }
    dispatch(createOrder(FormData))
  };

  useEffect(() => {
    if(payment === "successful" && ref === process.env.REACT_APP_TX_REF && cartTotalAmount > 0) {
      toast.success("Payment successful")
      saveOrder();
    } 

    if (payment === "failed") {
      toast.error("Payment failed")
    }

    setTimeout(() => {
      if(payment === "successful" && ref === process.env.REACT_APP_TX_REF) {
        navigate("/dashboard/user/checkout-success")
      }
    }, 5000)
  }, [payment, ref, cartTotalAmount, navigate]);

  function makePayment() {
    // eslint-disable-next-line no-undef
  FlutterwaveCheckout({
    public_key: process.env.REACT_APP_FLW_PK ,
    tx_ref: process.env.REACT_APP_TX_REF,
    amount: cartTotalAmount,
    currency: "NGN",
    payment_options: "card, mobilemoneyghana, ussd",
    redirect_url: `${process.env.REACT_APP_API}/response`,
    // meta: {
    //   consumer_id: 23,
    //   consumer_mac: "92a3-912ba-1192a",
    // },
    customer: {
      email: user.email,
      phone_number: user.phone,
      name: user.name,
    },
    customizations: {
      title: "maxstore online",
      description: "Payment for products",
      logo: "https://i.ibb.co/p1fWpWx/max-logo.png",
    },
  });
}
  return (
    <div className={styles.flwCustom}>
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
                <h4>Flutterwave Checkout</h4>
                <button
                  type="button"
                  className={styles.button}
                  onClick={makePayment}
                >
                  Pay Now
                </button>
              </Card>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
