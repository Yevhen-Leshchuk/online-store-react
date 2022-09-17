import { createSlice } from '@reduxjs/toolkit';
import currencyOperations from './currency-operations';

const initialState = {
  currency: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  extraReducers: {
    [currencyOperations.getCurrency.fulfilled](state, action) {
      state.currency = action.payload;
    },
  },
});

export default currencySlice.reducer;
