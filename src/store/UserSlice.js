import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const request = await axios.post(
      BACKEND_URL + "/auth/getUserLoggedin",
      userCredentials
    );

    const response = await request.data.user;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  try {
    const response = await axios.post(BACKEND_URL + "/get-user", userId);

    const userFromResponse = response.data.user;

    if (userFromResponse) {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const mergedUser = { ...storedUser, ...userFromResponse };

      localStorage.setItem("user", JSON.stringify(mergedUser));
      return mergedUser;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;

        if (action.error.message === "Request failed with status code 401") {
          state.error = "Access denied. Invalid Credentials.";
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default userSlice.reducer;
