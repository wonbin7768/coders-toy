import { createSlice } from "@reduxjs/toolkit";

const status = {
  status: "MainPage",
  login: false,
  id: "",
};
const initialState = status;
export const statusSlice = createSlice({
  name: "pageHandler",
  initialState,
  reducers: {
    pageHandler: (state, action) => {
      return {
        status: action.payload.status,
        login: action.payload.login,
        id: action.payload.id,
      };
    },
  },
});
export const { pageHandler } = statusSlice.actions;
export default statusSlice.reducer;
