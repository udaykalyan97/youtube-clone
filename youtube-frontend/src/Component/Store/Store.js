import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  likes: 0,
  dislikes: 0,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIKE_VIDEO':
            return { ...state, likes: state.likes + 1 };
        case 'DISLIKE_VIDEO':
            return { ...state, dislikes: state.dislikes + 1 };
        case 'EDIT_COMMENT':
            return {
                ...state,
                comments: state.comments.map((comment) =>
                    comment._id === action.payload._id ? action.payload : comment
                ),
            };
        default:
            return state;
    }
};


const store = configureStore({
  reducer: rootReducer,
});

export default store;
