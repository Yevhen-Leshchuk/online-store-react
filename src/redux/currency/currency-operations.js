import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { client } from '../../index';

export const GET_CURRENCY = gql`
  query getCurrency {
    currencies {
      label
      symbol
    }
  }
`;

const getCurrency = createAsyncThunk('currency/data', async (_, thunkAPI) => {
  try {
    const { data } = await client.query({ query: GET_CURRENCY });

    let currency = {};
    data.currencies.forEach(element => {
      currency[element.symbol] = element.label;
    });
    return currency;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const operations = {
  getCurrency,
};
export default operations;
