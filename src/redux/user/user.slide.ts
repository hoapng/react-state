import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchListUsers = createAsyncThunk(
  "users/fetchListUsers",
  async () => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    return data;
  }
);

interface IUserPayload {
  name: string;
  email: string;
}
export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (payload: IUserPayload, thunkAPI) => {
    const res = await fetch("http://localhost:8000/users", {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUsers());
    }
    return data;
  }
);

interface IUser {
  id: number;
  name: string;
  email: string;
}
const initialState: {
  listUsers: IUser[];
  isCreateSuccess: boolean;
} = {
  listUsers: [],
  isCreateSuccess: false,
};

// Then, handle actions in your reducers:
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    resetCreate(state) {
      state.isCreateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      // Add user to the state array
      //   console.log(">>>action", action);
      state.listUsers = action.payload;
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      // Add user to the state array
      //   console.log(">>>action", action);
      state.isCreateSuccess = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { resetCreate } = userSlice.actions;

export default userSlice.reducer;
