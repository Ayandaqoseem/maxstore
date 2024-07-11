import { useDispatch, useSelector } from "react-redux";
import PageMenu from "../../components/Nav/pageMenu/PageMenu";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUser, selectUser } from "../../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import mcImg from "../../assets/mc_symbol.png";
import paymentImg from "../../assets/payment-1.svg";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaRegPaperPlane } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import "./Wallet.scss";
import WalletTransactions from "./WalletTransactions";
import {
  RESET_TRANSACTION_MESSAGE,
  REST_RECEIVER,
  getUserTransactions,
  selectTransactionMessage,
  selectTransactions,
  transferFund,
  verifyAccount,
} from "../../redux/features/transaction/transactionSlice";
import TransferModal from "./TransferModal";
import toast from "react-hot-toast";
import { validateEmail } from "../../utils";
import DepositModal from "./DepositModal";
import Confetti from "react-confetti"
import axios from "axios";

const initialState = {
  amount: 0,
  sender: "",
  receiver: "",
  description: "",
  status: "",
};

const initialStateDeposit = {
  amount: 0,
  paymentMethod: "",
};

const BACKEND_URL = process.env.REACT_APP_API

export default function Wallet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [transferData, setTransferData] = useState(initialState);
  const { amount, sender, receiver, description, status } = transferData;

  const [showTransferModal, setShowTransferModal] = useState(false);
  const [isVerified, setIsverified] = useState(false);

  const user = useSelector(selectUser);
  

  const [ useParams ] = useSearchParams()
  const payment = useParams.get("payment")

  // deposit state
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [transferDepositData, setTransferDepositData] =
    useState(initialStateDeposit);

  const { amount: amountDeposit, paymentMethod } = transferDepositData;

  // deposit function
  const handleDepositInputChange = (e) => {
    const { name, value } = e.target;
    setTransferDepositData({ ...transferDepositData, [name]: value });
  };
  const depositMoney = async(e) => {
    e.preventDefault();

    
    if (amountDeposit < 1) {
      return toast.error("Please enter amount that is 10 above.");
    }
    if (paymentMethod === "") {
      return toast.error("Please select a pyment method");
    }

    if (paymentMethod === "flutterwave") {
      // eslint-disable-next-line no-undef
      FlutterwaveCheckout({
        public_key: process.env.REACT_APP_FLW_PK,
        tx_ref: process.env.REACT_APP_TX_REF,
        amount: amountDeposit,
        currency: "NGN",
        payment_options: "card, mobilemoneyghana, ussd",
        redirect_url: `${process.env.REACT_APP_API}/transaction/depositFundFLW`,
        // meta: {
        //   consumer_id: 23,
        //   consumer_mac: "92a3-912ba-1192a",
        // },
        customer: {
          email: user.email || user.newUser.email,
          phone_number: user.phone || user.newUser.phone,
          name: user.name || user.newUser.name,
        },
        customizations: {
          title: "maxstore wallet deposit",
          description: "Deposit funds to your maxstore wallet",
          logo: "https://i.ibb.co/p1fWpWx/max-logo.png",
        },
      });
      return;
    }
    
    if (paymentMethod === "stripe") {
      const { data } = await axios.post(`${BACKEND_URL}/transaction/depositFundStripe`,
      {
        amount: amountDeposit,
      })
      // console.log(data);
      // window.open(data.url)
      window.location.href = data.url;
      return; 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
  };
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
    setIsverified(false);
    dispatch(RESET_TRANSACTION_MESSAGE());
    dispatch(REST_RECEIVER());
  };
  const verifyUserAccount = async () => {
    if (receiver === "") {
      return toast.error("Please add receiver's account");
    }

    if (!validateEmail) {
      return toast.error("Please add valid email account");
    }

    const formData = {
      receiver,
    };

    dispatch(verifyAccount(formData));
  };

  const closeModal = (e) => {
    if (e.target.classList.contains("cm")) {
      setShowTransferModal(false);
      setShowDepositModal(false);
      setTransferData({ ...initialState });
      setTransferDepositData({ ...initialStateDeposit });
      setIsverified(false);
    }
  };

  const transferMoney = async (e) => {
    e.preventDefault();
    if (amount < 10) {
      return toast.error("Please enter amount more than 10");
    }

    if (!description) {
      return toast.error("Please enter a description");
    }

    const formData = {
      ...transferData,
      sender: user.email,
      status: "Success",
    };
    await dispatch(transferFund(formData));
    await dispatch(getUser());
  };

  const { isLoading } = useSelector((state) => state.transaction);

  
  const transactions = useSelector(selectTransactions);
  const transactionMessage = useSelector(selectTransactionMessage);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getUserTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (transactionMessage === "Account verification successful") {
      setIsverified(true);
    }

    if (transactionMessage === "Transaction successful") {
      setTransferData({ ...initialState });
      setShowTransferModal(false);
      setIsverified(false);
      dispatch(REST_RECEIVER());
      dispatch(getUserTransactions());
    }

    dispatch(RESET_TRANSACTION_MESSAGE());
  }, [transactionMessage, dispatch]);


  useEffect(() => {
    if(payment === "successful") {
      toast.success("Payment Successful")
      setTimeout (() => {
        navigate("/dashboard/user/wallet")
      }, 5000)
    }

    if(payment === "failed") {
      toast.error("Payment failed, please try later")
    }
  }, [payment, navigate])
  return (
    <>
    {payment === "successful" && <Confetti />}
    <section>
      <div className="container-fluid d-wrapper-wallet">
        <div className="row">
          <div className="col-md-12 wallet-info-container">
            <PageMenu />
            <div className="wallet ">
              <div className="wallet-data --flex-start --flex-dir-column">
                <div className="wallet-info --card --mr">
                  <span>Hello,</span>
                  <h4>{user?.name}</h4>
                  <div className="--underline"></div>
                  <span className="--flex-between">
                    <p>Account Balance</p>
                    <img src={mcImg} alt="mc" width={50} />
                  </span>
                  <h4>&#x20A6;{user?.balance?.toFixed(2)}</h4>
                  <div className="buttons --flex-center">
                    <button
                      className="--btn --btn-primary"
                      onClick={() => setShowDepositModal(true)}
                    >
                      <TbCurrencyNaira size={20} /> &nbsp; Deposit Money
                    </button>
                    <button
                      className="--btn --btn-danger"
                      onClick={() => setShowTransferModal(true)}
                    >
                      <FaRegPaperPlane /> &nbsp; Transfer Money
                    </button>
                  </div>
                </div>
                {/* wallet promo */}
                <div className="wallet-promo --flex-between --card">
                  <div className="wallet-text">
                    <span className="--flex-start">
                      <h4 className="text-header">Maxstore Wallet</h4>
                    </span>
                    <span className="--flex-start">
                      <h4>Cash back up to 80%</h4>
                      <AiFillGift size={20} color="#007bff" />
                    </span>
                    <span>
                      Use your maxstore wallet at checkout and get up to 80%
                      cashback
                    </span>
                  </div>
                  <div className="wallet-img">
                    <img src={paymentImg} alt="pay" className="payment-img" />
                  </div>
                </div>
              </div>
              {/* wallet transactions */}
              {user !== null && (
                <WalletTransactions transactions={transactions} user={user} />
              )}
            </div>
            {showTransferModal && (
              <TransferModal
                transferData={transferData}
                isVerified={isVerified}
                isLoading={isLoading}
                handleInputChange={handleInputChange}
                handleAccountChange={handleAccountChange}
                verifyUserAccount={verifyUserAccount}
                transferMoney={transferMoney}
                closeModal={closeModal}
              />
            )}

            {/* deposit modal */}
            {showDepositModal && (
              <DepositModal
                transferDepositData={transferDepositData}
                closeModal={closeModal}
                handleDepositInputChange={handleDepositInputChange}
                depositMoney={depositMoney}
              />
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
