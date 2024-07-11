import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import "./Checkout.scss";
import CheckoutForm from "../../components/checkout/checkoutForm/CheckoutForm";
import { extractIdAndCartQuantity } from "../../utils";
import { selectShippingAddress } from "../../redux/features/checkout/checkoutSlice";
import { toast } from "react-hot-toast";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

export default function Checkout() {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");

  const { user } = useSelector((state) => state.auth)
  console.log("user", user);


  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const { coupon } = useSelector((state) => state.coupon);
  const shippingAddress = useSelector(selectShippingAddress);

  const productIDs = extractIdAndCartQuantity(cartItems);

  const description = `maxStore payment: by email: ${user?.newUser?.email}, Amount: ${cartTotalAmount}`;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: productIDs,
        shipping: shippingAddress,
        description,
        coupon,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong!!!");
        console.log(error);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div>{!clientSecret && <h4>{message}</h4>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
