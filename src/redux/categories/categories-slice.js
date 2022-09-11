import { createSlice } from '@reduxjs/toolkit';
import categoriesOperations from './categories-operations';

const initialState = {
  name: [],
  productName: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: {
    [categoriesOperations.getAllCategories.fulfilled](state, action) {
      state.name = action.payload;
    },
    [categoriesOperations.getProductName.fulfilled](state, action) {
      state.productName = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
