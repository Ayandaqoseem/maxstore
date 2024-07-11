import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingGif from "../../image/loading/spinner.gif";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartDB,
  saveCartDB,
  selectCartItems,
} from "../../redux/features/cart/cartSlice";
import { validateEmail } from "../../utils";
import { RESET_AUTH, login } from "../../redux/features/auth/authSlice";
import Card from "../../components/cards/Card";
import "./authUser.scss";

export default function Login() {
  const { cartItems } = useSelector(selectCartItems) ?? {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, isLoading, isSuccess, user } = useSelector(
    (state) => state.auth
  );

  const [urlParams] = useSearchParams();
  const redirect = urlParams.get("redirect");
  console.log("show redirect =>", urlParams.get("redirect"));

  const navigate = useNavigate();
  // const location = useLocation();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      //  navigate("/");
      dispatch(getCartDB());
    }
    dispatch(RESET_AUTH());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <div className="wrapper-container-login-reg">
      <div className="container-fluid wrapper">
        <div className="row">
          <div className="col-md-6 img-side"></div>
          <div className="card-container">
            <Card cardClass={"card"}>
              <div className="form-container">
                {isLoading && (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "10vh" }}
                  >
                    <img
                      style={{ width: "100px" }}
                      src={LoadingGif}
                      alt="loading.."
                    />
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className="form-control p-2 mb-2 custom-border"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    type="password"
                    className="form-control p-2 mb-2 custom-border"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button className="btn btn-info" type="submit">
                    Login
                  </button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
