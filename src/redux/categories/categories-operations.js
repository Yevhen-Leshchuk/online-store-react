import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { client } from '../../index';

const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    categories {
      name
    }
  }
`;

const GET_PRODUCT_NAME = gql`
  query getProductName($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
      }
    }
  }
`;

const getAllCategories = createAsyncThunk(
  'categories/all',
  async (_, thunkAPI) => {
    try {
      const { data } = await client.query({ query: GET_ALL_CATEGORIES });
      return data.categories.map(category => category.name);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getProductName = createAsyncThunk(
  'categories/productName',
  async (category, thunkAPI) => {
    try {
      const { data } = await client.query({
        query: GET_PRODUCT_NAME,
        variables: { title: category },
      });

      return data.category.products.map(product => product.id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const operations = {
  getAllCategories,
  getProductName,
};
export default operations;
