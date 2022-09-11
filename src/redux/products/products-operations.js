// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { client } from '../../index';

// export const GET_PRODUCT_LIST = gql`
//   query getProductList($id: String!) {
//     product(id: $id) {
//       id
//       name
//       brand
//       inStock
//       gallery
//       prices {
//         amount
//         currency {
//           label
//           symbol
//         }
//       }
//     }
//   }
// `;

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

export const GET_PRODUCT_INFO = gql`
  query getProductInfo($id: String!) {
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

// export const getProductCellInfo = id => {
//   return client
//     .query({
//       query: GET_PRODUCT_CELL_INFO,
//       variables: { id: id },
//     })
//     .then(ApolloQuery => ApolloQuery.data.product)
//     .catch(e => console.log(e));
// };

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
};
export default operations;
