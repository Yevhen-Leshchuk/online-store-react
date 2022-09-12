import { createSlice } from '@reduxjs/toolkit';
import productsOperations from './products-operations';

const initialState = {
  products: [],
  productItem: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [productsOperations.getProductList.fulfilled](state, action) {
      state.products = action.payload;
    },

    [productsOperations.getProductItem.fulfilled](state, action) {
      state.productItem = action.payload;
    },
  },
});

export default productsSlice.reducer;
