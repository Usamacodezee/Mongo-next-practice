import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productSlice";
import userSlice from "./users/userSlice";
import cartSlice from "./cart/cartSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const rootReducer = {
  products: productsSlice,
  users: userSlice,
  cart: cartSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;

export default store;
