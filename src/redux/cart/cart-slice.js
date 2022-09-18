import { createSlice } from '@reduxjs/toolkit';
import { addToCartHandler, removeCartItemHandler } from './cart-utils';

const initialState = {
  cartItems: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItemToCart: (state, action) => {
      return {
        ...state,
        cartItems: addToCartHandler({
          prevCartItem: state.cartItems,
          nextCartItem: action.payload,
        }),
        quantity: state.cartItems.reduce((quantity, product) => {
          return quantity + product.quantity;
        }, 1),
      };
    },

    removeItemFromCart: (state, action) => {
      return {
        ...state,
        cartItems: removeCartItemHandler({
          prevCartItem: state.cartItems,
          cartItemToReduce: action.payload,
        }),
        quantity: state.quantity - 1,
      };
    },

    clearCart: (state, _) => {
      state.cartItems = [];
      state.quantity = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
