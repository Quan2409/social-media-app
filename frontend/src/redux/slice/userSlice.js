import { createSlice } from "@reduxjs/toolkit";
import { user } from "../../assets/data";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(window?.localStorage.getItem("user")) ?? user,
    isEdit: false,
  },

  reducers: {
    setLogin(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    setLogout(state) {
      state.user = null;
      localStorage?.removeItem("user");
    },

    setUpdateProfile(state, action) {
      state.isEdit = action.payload;
    },
  },
});

export const { setLogin, setLogout, setUpdateProfile } = userSlice.actions;
export default userSlice.reducer;
