import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'all',
};

const currentCategorySlice = createSlice({
  name: 'currentCategory',
  initialState: initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = currentCategorySlice.actions;
export const setCategoryReducer = currentCategorySlice.reducer;
