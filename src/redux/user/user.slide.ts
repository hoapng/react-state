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

export const updateAUser = createAsyncThunk(
  "users/updateAUser",
  async (payload: any, thunkAPI) => {
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
      headers: {
        "Content-Type": " application/json",
      },
    });
    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUsers());
    }
    return data;
  }
);

export const deleteAUser = createAsyncThunk(
  "users/deleteAUser",
  async (payload: any, thunkAPI) => {
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": " application/json",
      },
    });
    const data = await res.json();
    thunkAPI.dispatch(fetchListUsers());
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
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
} = {
  listUsers: [],
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
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
    resetUpdate(state) {
      state.isUpdateSuccess = false;
    },
    resetDelete(state) {
      state.isDeleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchListUsers.fulfilled, (state, action) => {
        // Add user to the state array
        //   console.log(">>>action", action);
        state.listUsers = action.payload;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        // Add user to the state array
        //   console.log(">>>action", action);
        state.isCreateSuccess = true;
      })
      .addCase(updateAUser.fulfilled, (state, action) => {
        // Add user to the state array
        //   console.log(">>>action", action);
        state.isUpdateSuccess = true;
      })
      .addCase(deleteAUser.fulfilled, (state, action) => {
        // Add user to the state array
        //   console.log(">>>action", action);
        state.isDeleteSuccess = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = userSlice.actions;

export default userSlice.reducer;
