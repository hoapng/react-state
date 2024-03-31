import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeMode(state, action) {
      state.mode = action.payload;
    },
  },
});

export const { changeMode } = appSlice.actions;

export default appSlice.reducer;
