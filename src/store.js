import { configureStore } from "@reduxjs/toolkit";
import statusReducer from "./features/statusSlice";
import { composeWithDevTools } from "redux-devtools-extension";

export default configureStore({
  reducer: {
    page: statusReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
