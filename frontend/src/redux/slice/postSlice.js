import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: {},
  },

  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export const { getPosts } = postSlice.actions;
export default postSlice.reducer;
