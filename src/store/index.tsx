import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productsSlice from './productSlice';
import themeConfigSlice from './themeConfigSlice';
import cartSlice from './cartSlice';
import wishListSlice from './wishListSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    products: productsSlice,
    cart: cartSlice,
    wishlist: wishListSlice
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredPaths: ['wishlist.addToWishlist.payload.headers'],
        },
      }),
});

export type IRootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
