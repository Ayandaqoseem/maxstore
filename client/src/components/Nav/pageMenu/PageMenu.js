import { NavLink } from "react-router-dom";
import "./PageMenu.scss";
import { useSelector } from "react-redux";

export default function PageMenu() {
  const { user } = useSelector((state) => state.auth);

  
  return (
    <div>
      <nav className="nav-wrapper">
        <ul className="home-links">
          <li>
            <NavLink
              to={
                user?.role === "admin"
                  ? "/dashboard/admin/profile"
                  : "/dashboard/user/profile"
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/user/wallet">My Wallet</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/user/wishlist">Whishlist</NavLink>
          </li>
          
             <li>
             <NavLink to="/dashboard/user/order-history">My Orders</NavLink>
           </li>
         
        </ul>
      </nav>
    </div>
  );
}
