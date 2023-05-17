import { createSlice } from "@reduxjs/toolkit";

const status = {
  login: false,
  id: "",
  img: "",
  // modalOpen: false,
};
const initialState = status;
export const statusSlice = createSlice({
  name: "pageHandler",
  initialState,
  reducers: {
    pageHandler: (state, action) => {
      return {
        login: action.payload.login,
        id: action.payload.id,
        img: action.payload.img,
        // modalOpen: action.payload.modalOpen,
      };
    },
  },
});
export const { pageHandler } = statusSlice.actions;
export default statusSlice.reducer;
