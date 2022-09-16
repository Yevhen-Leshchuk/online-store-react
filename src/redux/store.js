import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';
import { categoriesReducer } from './categories';
import { setCategoryReducer } from './currentCategory';
import { productsReducer } from './products';
import { cartReducer } from './cart';

const middleware = getDefaultMiddleware => [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  // logger,
];

const cartPersistConfig = {
  key: 'cart',
  storage,
};

const productsPersistConfig = {
  key: 'products',
  storage,
};

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    currentCategory: setCategoryReducer,
    products: persistReducer(productsPersistConfig, productsReducer),
    cart: persistReducer(cartPersistConfig, cartReducer),
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware,
});

export const persistor = persistStore(store);
