import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistedAuthReducer from "../redux/features/auth/authSlice";
import categoryReducer from "../redux/features/categoryAndBrand/categoryAndBrandSlice";
import productReducer from "../redux/features/product/productSlice";
import FilterReducer from "../redux/features/product/FilterSlice";
import couponReducer from "../redux/features/coupon/couponSlice";
import cartReducer from "../redux/features/cart/cartSlice";
import checkoutReducer from "../redux/features/checkout/checkoutSlice";
import orderReducer from "../redux/features/order/orderSlice";
import transactionReducer from "../redux/features/transaction/transactionSlice";
import slideReducer from "../redux/features/slide/slideSlice";



export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        category: categoryReducer,
        product: productReducer,
        filter: FilterReducer,
        coupon: couponReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        order: orderReducer,
        transaction: transactionReducer,
        slide: slideReducer,
    }
});


export const persistor = persistStore(store);