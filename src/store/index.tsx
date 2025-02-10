import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsSlice from './productSlice';
import themeConfigSlice from './themeConfigSlice';
import cartSlice from './cartSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    products: productsSlice,
    cart: cartSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
