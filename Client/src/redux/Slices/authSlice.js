import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "",
  isLoading: false,
  error: "",
  token: null,
};

export const userSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.currentUser = payload.user;
    },
    loginFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    },
    // signupPending: (state) => {
    //   state.isLoading = true;
    // },
    // signupSuccess: (state, { payload }) => {
    //   state.isLoading = false;
    // },
    // signupFailed: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.error = true;
    // },
    logout: (state) => {
      state.currentUser = "";
      state.isLoading = false;
      state.error = "";
    },
    subscription: (state, { payload }) => {
      if (state.currentUser.subscribedUsers.includes(payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex((sub) => sub === payload),
          1
        );
      } else {
        state.currentUser.subscribedUsers.push(payload);
      }
    },
  },
});

const { actions, reducer } = userSlice;

export const {
  loginPending,
  loginSuccess,
  loginFailed,
  // signupPending,
  // signupSuccess,
  // signupFailed,
  logout,
  subscription,
} = actions;

export default reducer;
