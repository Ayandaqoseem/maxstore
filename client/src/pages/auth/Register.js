import { useState, useEffect } from "react";
// import axios from "axios";
import toast from "react-hot-toast";
// import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingGif from "../../image/loading/spinner.gif";
import { validateEmail } from "../../utils";
import { register } from "../../redux/features/auth/authSlice";
import { RESET_AUTH } from "../../redux/features/auth/authSlice";
import Card from "../../components/cards/Card";
import "./authUser.scss"

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};

export default function Register() {
  // state
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, cPassword } = formData;
  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  // const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return toast.error("All fields are required");
      }
      if (password.length < 8) {
        return toast.error("Password must be up to 8");
      }
      if (!validateEmail(email)) {
        return toast.error("Please enter a valid email");
      }
      if (password !== cPassword) {
        return toast.error("Password do not match");
      }

      const userData = {
        name,
        email,
        password,
      };

      console.log(userData);
      await dispatch(register(userData));
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Try again");
    }
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
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
                      type="text"
                      className="form-control p-2 mb-2"
                      placeholder="Enter your name"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                    />

                    <input
                      type="email"
                      className="form-control p-2 mb-2"
                      placeholder="Enter your email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                    />

                    <input
                      type="password"
                      className="form-control p-2 mb-2"
                      placeholder="Enter your password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                    <input
                      type="password"
                      className="form-control p-2 mb-2"
                      placeholder="Confirm password"
                      name="cPassword"
                      value={cPassword}
                      onChange={handleInputChange}
                    />

                    <button className="btn btn-info" type="submit">
                      Register
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
