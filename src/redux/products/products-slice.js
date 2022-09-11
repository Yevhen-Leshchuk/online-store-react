import { createSlice } from '@reduxjs/toolkit';
import productsOperations from './products-operations';

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [productsOperations.getProductList.fulfilled](state, action) {
      state.products = action.payload;
    },
  },
});

export default productsSlice.reducer;
