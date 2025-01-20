// editingCommentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editingCommentId: null,
  editingMessage: '',
  isNewComment: true,  // Track if it's a new comment
};

export const editingCommentSlice = createSlice({
  name: 'editingComment',
  initialState,
  reducers: {
    setEditingComment: (state, action) => {
      state.editingCommentId = action.payload.commentId;
      state.editingMessage = action.payload.message;
      state.isNewComment = action.payload.isNew || false;  // Store whether it's new or edited
    },
    clearEditingComment: (state) => {
      state.editingCommentId = null;
      state.editingMessage = '';
    },
    updateEditingMessage: (state, action) => {
      state.editingMessage = action.payload;
    },
  },
});

export const { setEditingComment, clearEditingComment, updateEditingMessage } = editingCommentSlice.actions;

export default editingCommentSlice.reducer;
