import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(window.localStorage.getItem("user")) ?? {},
  isEdit: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    setLogout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },

    setUpdateStatus(state, action) {
      state.isEdit = action.payload;
    },
  },
});

export const { setLogin, setLogout, setUpdateStatus } = userSlice.actions;
export default userSlice.reducer;
