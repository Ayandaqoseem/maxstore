import { useEffect, useState } from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import Loading from "./Loadng";
import { useDispatch, useSelector } from "react-redux";
import { authAdminCheck } from "../../redux/features/auth/authSlice";

export default function PrivateRoute() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // state
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminCheck = async () => {
      try {
        const response = await dispatch(authAdminCheck());
        const { message } = response.payload;
        if (message === "ok") {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Unauthorized error occurred.');
        } else {
          console.log('An error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    adminCheck();
  }, [dispatch]);

  if (loading) {
    return <Loading path="" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!ok) {
    return (
        <>
            <div className="unauthorized">
                <h3>User Unauthorized</h3>
                <Link to="/">
                    <button className="backHome">&larr; Back To Home Page</button>
                </Link>
            </div>
        </>
    );
  }

  return <Outlet />;
}