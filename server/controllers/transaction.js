import axios from "axios";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";
import { stripe } from "../utils/index.js";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;



// Transfer fund
export const transferFund = async (req, res) => {
  try {
    
    const { amount, sender, receiver, description, status } = req.body;

    // validation
    if (!amount || !sender || !receiver) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    if(sender === receiver) {
      return res.json({ message: "Not authorized"})
    }

    // check senders account
    const user = await User.findOne({ email: sender });
    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Decrease sender account balaance
    await User.findOneAndUpdate(
      { email: sender },
      {
        $inc: { balance: -amount },
      }
    );

    //   Increase receiver account balaance
    await User.findOneAndUpdate(
      { email: receiver },
      {
        $inc: { balance: amount },
      }
    );

    // save transaction
    const newTransaction = await Transaction.create(req.body);
    

    res.json({ message: "Transaction successful" });
  } catch (error) {
    console.log(error);
  }
};

// Verify Account
export const verifyAccount = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.receiver });
    if (!user) {
      return res.status(400).json({ message: "User account not found." });
    }

    res.json({ receiverName: user.name, message: "Account verification successful" });
  } catch (error) {
    console.log(error);
  }
};

// Get user transactions
export const getUserTransactions = async (req, res) => {
  try {
   
    const transactions = await Transaction.find({
      $or: [{ sender: req.user.email }, { receiver: req.user.email }],
    })
    .sort({ createdAt: -1 })
    .populate("sender")
    .populate("receiver");

    res.json(transactions);
    
  } catch (error) {
    console.log(error);
  }
};


export const depositFundStripe = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user._id)

    //  create a stripe customer 
    if(!user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
      });
      user.stripeCustomerId = customer.id;
      user.save()
    }

    // create stripe session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "NGN",
            product_data: {
              name: "maxstore wallet deposit",
              description: `Make a deposit of NGN${amount} to maxstore wallet`,  
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      customer: user.stripeCustomerId,
      success_url: `${process.env.FRONTEND_URL}/dashboard/user/wallet?payment=successfull&amount=${amount}`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard/user/wallet?payment=failed`,
    })

    
    return res.json(session)
  } catch (error) {
    console.log(error);
  }
}

// Deposit fund Stripe || FLW
const depositFund = async(customer, data, description, source) => {
  await Transaction.create({
    amount: source === "stripe" ? data.amount_subtotal / 100 : data.amount_subtotal,
    sender: "self",
    receiver: customer.email,
    description,
    status: "success"
  });

  // increase the receiver's balance
  await User.findOneAndUpdate(
    { email: customer.email},
    {
      $inc: {
        balance:
          source === "stripe"
            ? data.amount_subtotal / 100
            : data.amount_subtotal,
      },
    }
  )
}

// stripe webhook
export const webhook = async (req, res) => {
  try {
    const sig = request.headers["stripe-signature"]

    let data;
    let event;
    let eventType;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook verified");
    } catch (error) {
      console.log("Webhook verification error", error);
      response.status(400).send(`Webhook Error: ${error.message}`);
    }

    data = event.data.object;
    eventType = event.type;

    // handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers
      .retrieve(data.customer)
      .then(async(customer) => {
        console.log(customer.email);
        // deposit fund into customer account
        const description = "Stripe deposit"
        const source = "stripe"
        depositFund(customer, data, description, source)
      })
      .catch((err) => console.log(err.message))
    }

    
    res.send().end()
  } catch (error) {
    console.log(error);
  }
}



// deposit fund FLW
export const depositFundFLW = async(req, res) => {
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

    // console.log(response.data.data);
    const { tx_ref, amount, customer } = response.data.data;

    const successfulURL = process.env.FRONTEND_URL + `/dashboard/user/wallet?payment=successful`;
    const failureURL = process.env.FRONTEND_URL + `/dashboard/user/wallet?payment=failed`;
    if (req.query.status === "successful") {
      // deposit money in user's wallet
      const data = {
        amount_subtotal: amount
      }
      const description = "Flutterwave deposit"
      const source = "fluterwave"
      depositFund(customer, data, description, source)
      res.redirect(successfulURL)
    } else {
      res.redirect(failureURL)
    }
  } catch (error) {
    console.log(error.message);
  }
}
