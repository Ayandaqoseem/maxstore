import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Menu from "./components/Nav/Menu";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";
import NewNavMenu from "./components/Nav/NewNavMenu";
import AdminCategory from "./pages/admin/Category";
import Order from "./pages/user/Order";
import AdminSlide from "./pages/admin/Slide";
import AllSlides from "./pages/admin/Slides";
import AdminSlideUpdate from "./pages/admin/SlideUpdate";
import Category from "./pages/admin/ReduxCategory/Categoryy";
import Brand from "./pages/admin/ReduxCategory/brand/Brand";
import AddProduct from "./pages/admin/ReduxCategory/product/addProduct";
import ViewProducts from "./pages/admin/ReduxCategory/product/viewProducts";
import EditProduct from "./pages/admin/ReduxCategory/product/editProduct";
import Footer from "./components/footer/Footer";
import Coupon from "./pages/admin/ReduxCategory/coupon/Coupon";
import Product from "./pages/shop/Product";
import ProductDetails from "./components/product/productDetails/ProductDetail";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderDetails from "./pages/user/OrderDetails";
import OrderAdmin from "./pages/admin/ReduxCategory/order/OrderAdmin";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./redux/features/auth/authSlice";
import AdminProfile from "./pages/admin/profile/Profile";
import AdminWishlist from "./pages/admin/wishlist/Wishlist";
import AdminWallet from "./pages/admin/wallet/Wallet";
import UserProfile from "./pages/user/profile/Profile";
import AdminOrderHistory from "./pages/admin/ReduxCategory/order/AdminOrderHistory";
import CheckoutWithFlutterwave from "./pages/checkout/CheckoutWithFlutterwave";
import CheckoutPaypal from "./pages/checkout/CheckoutPaypal";
import Wallet from "./pages/wallet/Wallet";
import CheckoutWallet from "./pages/checkout/CheckoutWallet";


const PageNotFound = () => {
  return (
    <div className="d-flex h3 justify-content-center align-items-center vh-100">
      404 | Page not found
    </div>
  );
};
axios.defaults.withCredentials = true;

export default function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getLoginStatus())
  }, [dispatch])
  return (
    <BrowserRouter>
      <Menu />
      <NewNavMenu />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Product />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/checkout-details" element={<CheckoutDetails />} />
        <Route path="/checkout-stripe" element={<Checkout />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/order-history" element={<Order />} />
          <Route path="user/order-details/:id" element={<OrderDetails />} />
          
          <Route path="user/checkout-details" element={<CheckoutDetails />} />
          <Route path="user/checkout-stripe" element={<Checkout />} />
          <Route path="user/checkout-success" element={<CheckoutSuccess />} />
          <Route path="user/checkout-flutterwave" element={<CheckoutWithFlutterwave />} />
          <Route path="user/checkout-paypal" element={<CheckoutPaypal />} />
          <Route path="user/checkout-wallet" element={<CheckoutWallet />} />
          <Route path="user/wallet" element={<Wallet />} />
        </Route>


        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/profile" element={<AdminProfile />} />
          <Route path="admin/wishlist" element={<AdminWishlist />} />
          <Route path="admin/wallet" element={<AdminWallet/>} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/redx-category" element={<Category />} />
          <Route path="admin/brand" element={<Brand />} />
          <Route path="admin/add-product" element={<AddProduct />} />
          <Route path="admin/all-products" element={<ViewProducts />} />
          <Route path="admin/edit-product/:id" element={<EditProduct />} />
          <Route path="admin/coupon" element={<Coupon />} />
          <Route path="admin/order-history" element={<OrderAdmin />} />
          <Route path="admin/order-details/:id" element={<AdminOrderHistory />} />

          {/* <Route path="admin/sub-category" element={<SubCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/product/update/:slug" element={<AdminProductUpdate />} /> */}
          <Route path="admin/slide" element={<AdminSlide />} />
          <Route path="admin/slides" element={<AllSlides />} />
          <Route
            path="admin/slide/update/:slug"
            element={<AdminSlideUpdate />}
          />
        </Route>

        <Route path="*" element={<PageNotFound />} replace />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
