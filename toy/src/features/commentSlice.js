import { createSlice } from "@reduxjs/toolkit";

const comment = {
  id: "jolly7768",
  img:"./img/sea.jpg",
  content:"게시글 테스트!",
  like:5,
};
const initialState = comment;
export const commentSlice = createSlice({
  name: "commentHandler",
  initialState,
  reducers: {
    timelintHandler: (state, action) => {
      return {
        id: action.payload.id,
        img: action.payload.img,
        content: action.payload.content,
        like: action.payload.like,
      };
    },
  },
});
export const { commentHandler } = commentSlice.actions;
export default commentSlice.reducer;
