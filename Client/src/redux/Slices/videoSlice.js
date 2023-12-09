import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  isLoading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "Video",
  initialState,
  reducers: {
    videoPending: (state) => {
      state.isLoading = true;
    },
    videoSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.currentVideo = payload;
    },
    videoFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    like: (state, { payload }) => {
      if(!state.currentVideo.likes.includes(payload)){
        state.currentVideo.likes.push(payload);
        state.currentVideo.disLikes.splice(state.currentVideo.disLikes.findIndex(
          (userId) => userId === payload
        ), 1)
      }
    },
    dislike: (state, { payload }) => {
      if(!state.currentVideo.disLikes.includes(payload)){
        state.currentVideo.disLikes.push(payload);
        state.currentVideo.likes.splice(state.currentVideo.likes.findIndex(
          (userId) => userId === payload
        ), 1)
      }
    },
  },
});

const { actions, reducer } = videoSlice;

export const { videoPending, videoSuccess, videoFailed, like, dislike } = actions;

export default reducer;
