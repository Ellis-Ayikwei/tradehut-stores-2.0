import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../helper/axiosInstance';

// Define the CartItem interface as needed
export interface CartItem {
    productId: string;
    quantity: number;
    variantId?: string;
}

// Define the state interface for the cart slice
interface CartState {
    cart: Cart[];
    isUpdating: boolean;
}

const initialState: CartState = {
    cart: [],
    isUpdating: false,
};

export const getCart = createAsyncThunk('cart/getCart', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`users/1c110288-2c26-4837-b4b7-bbd4a29b3832/my_cart/`);
        console.log('response from the thunk', response.data);
        return response.data as Cart[];
    } catch (error) {
        console.error('Failed to get cart:', error);
        return rejectWithValue(error);
    }
});

// Async thunk to add an item to the cart
export const addToCart = createAsyncThunk('cart/addToCart', async (payload: { productId: string; quantity: number; variantId?: string }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('carts/e4be73ec-f98c-48cd-b8a1-7f618df8c093/', payload);
        // Assuming the response contains the updated cart as response.data.cart
        return response.data.cart as Cart[];
    } catch (error) {
        console.error('Failed to add to cart:', error);
        return rejectWithValue(error);
    }
});

// Async thunk to remove an item from the cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (payload: { productId: string; variantId?: string }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/cart/remove', payload);
        // Assuming the response contains the updated cart as response.data.cart
        return response.data.cart as CartItem[];
    } catch (error) {
        console.error('Failed to remove from cart:', error);
        return rejectWithValue(error);
    }
});

// Create the cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Optionally, add synchronous actions here if needed
    },
    extraReducers: (builder) => {
        builder.addCase(getCart.pending, (state) => {
            state.isUpdating = true;
        });
        builder.addCase(getCart.fulfilled, (state, action: PayloadAction<Cart[]>) => {
            state.cart = action.payload;
            state.isUpdating = false;
        });
        builder.addCase(getCart.rejected, (state) => {
            state.isUpdating = false;
        });
        builder.addCase(addToCart.pending, (state) => {
            state.isUpdating = true;
        });
        builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<Cart[]>) => {
            state.cart = action.payload;
            state.isUpdating = false;
        });
        builder.addCase(addToCart.rejected, (state) => {
            state.isUpdating = false;
        });

        // // Handle removeFromCart lifecycle
        // builder.addCase(removeFromCart.pending, (state) => {
        //     state.isUpdating = true;
        // });
        // builder.addCase(removeFromCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        //     state.cart = action.payload;
        //     state.isUpdating = false;
        // });
        // builder.addCase(removeFromCart.rejected, (state) => {
        //     state.isUpdating = false;
        // });
    },
});

export default cartSlice.reducer;
