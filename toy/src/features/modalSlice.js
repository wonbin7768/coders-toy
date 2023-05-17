import { createSlice } from "@reduxjs/toolkit";

const modal = false;
const initialState = modal;
export const modalSlice = createSlice({
  name: "modalHandler",
  initialState,
  reducers: {
    modalHandler: (state, action) => {
      return {
        modal: action.payload.modal,
      };
    },
  },
});
export const { modalHandler } = modalSlice.actions;
export default modalSlice.reducer;
