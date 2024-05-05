import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slice/themeSlice";
import userReducer from "./slice/userSlice";
import postReducer from "./slice/postSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    theme: themeReducer,
  },
});

export default store;
