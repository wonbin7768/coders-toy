import { createSlice } from "@reduxjs/toolkit";

const initialState =[];
export const commentSlice = createSlice({
  name: "commentHandler",
  initialState,
  reducers: {
    commentHandler(state, action) {
      
    },
  },
});
export const { commentHandler } = commentSlice.actions;
export default commentSlice.reducer;
