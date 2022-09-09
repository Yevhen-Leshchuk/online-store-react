// import axios from 'axios';
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

const getAllCategories = createAsyncThunk(
  'categories/all',
  async (_, thunkAPI) => {
    try {
      const { data } = await client.query({ query: GET_ALL_CATEGORIES });
      // successMessage('Вы успешно зарегистрированы!');
      return data.categories.map(category => category.name);
    } catch (error) {
      // errorMessage('Такой пользователь уже существует!');
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const operations = {
  getAllCategories,
};
export default operations;
