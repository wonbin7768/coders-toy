import { createSlice } from "@reduxjs/toolkit";

const timeline = {
  id: "jolly7768",
  img:"./img/sea.jpg",
  content:"게시글 테스트!",
  like:5,
};
const initialState = timeline;
export const timelineSlice = createSlice({
  name: "timelineHandler",
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
export const { timelineHandler } = timelineSlice.actions;
export default timelineSlice.reducer;
