import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/features/cart/cartSlice";
import {
  selectPaymentMethod,
  selectShippingAddress,
} from "../../redux/features/checkout/checkoutSlice";
import { selectUser } from "../../redux/features/auth/authSlice";
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import Card from "../../components/cards/Card";
import mcImg from "../../assets/mc_symbol.png";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import LoadingGif from "../../image/loading/spinner.gif";
import { useNavigate } from "react-router-dom";
import "./Checkout.scss"
import toast from "react-hot-toast";
import axios from "axios";
import { extractIdAndCartQuantity } from "../../utils";

export default function CheckoutWallet() {
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const { coupon } = useSelector((state) => state.coupon);
  const { isLoading } = useSelector((state) => state.order);

  const productIDs = extractIdAndCartQuantity(cartItems)

  const navigate = useNavigate();

  const makePayment = async() => {
    if(cartItems < 1) {
      return toast.error("Cart amount is zero.")
    }

    const response = await axios.post(
      `${process.env.REACT_APP_API}/payWithWallet`,
      {
        items: productIDs,
        cartItems,
        shippingAddress,
        coupon: coupon !== null ? coupon : {name: "nil"}
      }
    )
    console.log(response.data);
    toast.success(response.data.message);
    window.location.href = response.data.url;
  };
  const goToWallet = () => {
    navigate("/wallet");
  };

  return (
    <div className={`container-fluid wallet-container ${styles.checkout}`}>
      <h4>Checkout</h4>
      <form>
        <div>
          <Card cardClass={styles.card}>
            <CheckoutSummary />
          </Card>
        </div>

        <div>
          <Card cardClass={`${styles.card} ${styles.pay}`}>
            <h4>Maxstore Wallet Checkout</h4>
            <div className="wallet-info --card --mr">
              <span className="--flex-between">
                <p>Account Balance</p>
                <img alt="mc" src={mcImg} width={50} />
              </span>
              <h4>&#x20A6;{user?.balance?.toFixed(2)}</h4>
            </div>
            <br />
            {cartTotalAmount < user?.balance?.toFixed(2) ? (
              <>
                {isLoading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "2vh" }}
                  >
                    <img
                      style={{ width: "40px" }}
                      src={LoadingGif}
                      alt="loading.."
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    className={styles.button}
                    onClick={makePayment}
                  >
                    Pay Now
                  </button>
                )}
              </>
            ) : (
              <div className="--center-all">
                <h4>Insufficent balance!!!</h4>
                <button
                  className="--btn --btn-danger --btn-block"
                  onClick={goToWallet}
                >
                  Top Up Wallet
                </button>
              </div>
            )}
          </Card>
        </div>
      </form>
    </div>
  );
}
