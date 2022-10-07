import { createSlice } from "@reduxjs/toolkit";

const account = {
  status: "MainPage",
};
const initialState = account;
export const statusSlice = createSlice({
  name: "pageHandler",
  initialState,
  reducers: {
    pageHandler: (state, action) => {
      state.status = action.payload.status;
    },
  },
});
export const { pageHandler } = statusSlice.actions;
export default statusSlice.reducer;
