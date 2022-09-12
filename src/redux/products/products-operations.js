// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { client } from '../../index';

const GET_PRODUCT_ITEM = gql`
  query getProductItem($id: String!) {
    product(id: $id) {
      id
      name
      brand
      inStock
      gallery
      description
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
    }
  }
`;

const getProductItem = createAsyncThunk(
  'product/Item',
  async (id, thunkAPI) => {
    try {
      const { data } = await client.query({
        query: GET_PRODUCT_ITEM,
        variables: { id: id },
      });
      // successMessage('Вы успешно зарегистрированы!');
      return data.product;
    } catch (error) {
      // errorMessage('Такой пользователь уже существует!');
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const GET_PRODUCT_LIST = gql`
  query getProductList($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        brand
        gallery
        inStock
        attributes {
          id
          name
          type
          items {
            displayValue
            id
            value
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;

const getProductList = createAsyncThunk(
  'product/list',
  async (category, thunkAPI) => {
    try {
      const { data } = await client.query({
        query: GET_PRODUCT_LIST,
        variables: {
          input: {
            title: category,
          },
        },
      });
      // successMessage('Вы успешно зарегистрированы!');
      console.log(data);
      return data.category.products;
    } catch (error) {
      // errorMessage('Такой пользователь уже существует!');
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const operations = {
  getProductList,
  getProductItem,
};
export default operations;
