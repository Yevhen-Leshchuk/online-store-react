import { createSlice } from '@reduxjs/toolkit';
import categoriesOperations from './categories-operations';

const initialState = {
  name: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: {
    [categoriesOperations.getAllCategories.fulfilled](state, action) {
      state.name = action.payload;
    },
  },
});

export const { setCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
