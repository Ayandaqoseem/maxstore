import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import User from "../models/user.js"
import Product from "../models/product.js";
import { calculateTotalPrice, updateProductQuantity } from "../utils/index.js"
import Stripe from 'stripe'
import { sendEmail } from "../utils/sendEmail.js";
import Transaction from "../models/transaction.js"
import { orderSuccessEmail } from "../emailTemplates/orderTemplate.js";
import axios from "axios";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createOrder = async (req, res) => {
  try {
    const {
      orderDate,
      orderTime,
      orderAmount,
      orderStatus,
      cartItems,
      shippingAddress,
      paymentMethod,
      coupon,
    } = req.body;

    //     Validation
    if (!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
      return res.json("Order data missing!!!");
    }


    await Order.create({
      user: new mongoose.Types.ObjectId(req.user._id),
      orderDate,
      orderTime,
      orderAmount,
      orderStatus,
      cartItems,
      shippingAddress,
      paymentMethod,
      coupon,
    });
    
    // update product quantity
    await updateProductQuantity(cartItems)

    // Send Order Email to the User
    const subject = "New Order Placed - maxstore"
    const send_to = req.user.email
    const template = orderSuccessEmail(req.user.name, cartItems)
    const reply_to = "no_reply@maxstore.com"

    await sendEmail(subject, send_to, template, reply_to)

    res.json({ message: "Order created" });
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = async (req, res) => {
  try {
    
    let orders;
    orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    console.log(err);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    
    let orders;
      orders = await Order.find().sort({ createdAt: -1 });
      return res.json(orders);
    // console.log("show all order => ", orders);

  } catch (err) {
    console.log(err);
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.json("Order not found");
    }
    
    if (req.user.role === "admin") {
      return res.json(order);
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized to view the order" });
    }
    res.json(order);
  } catch (err) {
    console.log(err);
  }
};


// update Order status
export const UpdateOrderStatus = async(req, res) => {
  try {
    const { orderStatus } = req.body;
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return req.json("Order not found");
    }

    // Update the order status
    await Order.findByIdAndUpdate(
      {
        _id: id
      },
      {
        orderStatus
      },
      {
        new: true,
        runValidators: true,
      }
    )

    res.json({ message: "Order status updated" })
  } catch (err) {
    console.log(err);
  }
}


export const payWithStripe = async(req, res) => {
  try {
    const { items, shipping, description, coupon } = req.body;

   const products = await Product.find();

   let orderAmount;
   orderAmount = calculateTotalPrice(products, items);


   if(coupon !== null && coupon?.name !== "nil") {
      let totalAfterDiscount = 
      orderAmount - (orderAmount * coupon?.discount) /100;
      orderAmount = totalAfterDiscount
   }

  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: orderAmount,
    currency: "NGN",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postal_code,
      },
      name: shipping.name,
      phone: shipping.phone,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  } catch (err) {
    console.log(err);
  }
}


// verify FLW payment
export const verifyFlwPayment = async(req, res) => {
  try {
    const { transaction_id } = req.query;

    // confirm transaction
    const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

    const response = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: process.env.FLW_SECRET_KEY,
      },
    });

    console.log(response.data.data);
    const { tx_ref } = response.data.data;

    const successfulURL = process.env.FRONTEND_URL + `/dashboard/user/checkout-flutterwave?payment=successful&ref=${tx_ref}`;
    const failureURL = process.env.FRONTEND_URL + `/dashboard/user/checkout-flutterwave?payment=failed`;
    if (req.query.status === "successful") {
      res.redirect(successfulURL)
    } else {
      res.redirect(failureURL)
    }
  } catch (error) {
    console.log(error.message);
  }
}

// Pay with wallet
export const payWithWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    console.log(user);

    const { items, cartItems, shippingAddress, coupon } = req.body;

    const products = await Product.find()
    const today = new Date()


    let orderAmount;
    orderAmount = calculateTotalPrice(products, items);

    if(coupon !== null && coupon?.name !== "nil") {
      let totalAfterDiscount = 
      orderAmount - (orderAmount * coupon?.discount) / 100;
      orderAmount = totalAfterDiscount;
    }
    

    // check wallet balance
    if (user.balance < orderAmount) {
      return res.status(400).json("Insufficient balance")
    }

    // create transaction
    const newTransaction = Transaction.create({
      amount: orderAmount,
      sender: user.email,
      receiver: "maxstore",
      description: "Payment for products.",
      status: "success"
    })


    // decrease sender's wallet balance
    const newBalance = await User.findOneAndUpdate(
      { email: user.email },
      {
        $inc: {balance: -orderAmount }
      }
    );

    // create order
    const newOrder = await Order.create({
      user: user._id,
      orderDate: today.toString(),
      orderTime: today.toLocaleTimeString(),
      orderAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      paymentMethod: "Maxstore Wallet",
      coupon,
    });

    // Update product quantity
    await updateProductQuantity(cartItems)

    // Send Order Email to the User
    const subject = "New Order Placed - maxstore"
    const send_to = user.email
    const template = orderSuccessEmail(user.name, cartItems)
    const reply_to = "no_reply@maxstore.com"

    await sendEmail(subject, send_to, template, reply_to)

    if(newTransaction && newBalance && newOrder) {
      return res.json({
        message: "Payment successful.",
        url: `${process.env.FRONTEND_URL}/dashboard/user/checkout-success`
      });
    }
    res.status(400).json({ message: "Something went wrong, please contact admin"})

  } catch (error) {
    console.log(error);
  }
}
