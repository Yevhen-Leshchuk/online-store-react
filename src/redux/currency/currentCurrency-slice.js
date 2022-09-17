import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  symbol: '$',
};

const currentCurrencySlice = createSlice({
  name: 'currentCurrency',
  initialState: initialState,
  reducers: {
    addCurrentCurrency: (state, action) => {
      state.symbol = action.payload;
    },
  },
});

export const { addCurrentCurrency } = currentCurrencySlice.actions;
export const currentCurrencyReducer = currentCurrencySlice.reducer;
