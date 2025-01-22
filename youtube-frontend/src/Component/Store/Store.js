import { configureStore, createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  likes: 0,
  dislikes: 0,
  comments: [], // Array to hold comments
  history: [], // Array to hold history items
};

// Create a slice with actions and reducers
const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    likeVideo: (state) => {
      state.likes += 1;
    },
    dislikeVideo: (state) => {
      state.dislikes += 1;
    },
    editComment: (state, action) => {
      const { _id, text } = action.payload;
      const commentIndex = state.comments.findIndex((comment) => comment._id === _id);
      if (commentIndex !== -1) {
        state.comments[commentIndex].text = text;
      }
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    addHistoryItem: (state, action) => {
      const { videoId, title, timestamp } = action.payload;
      state.history.push({ videoId, title, timestamp });
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

// Export the actions
export const { likeVideo, dislikeVideo, editComment, addComment, addHistoryItem, clearHistory } =
  videoSlice.actions;

// Create the Redux store
const store = configureStore({
  reducer: {
    video: videoSlice.reducer,
  },
});

export default store;
