import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import axiosInstance from '@/lib/axiosInstance'
import { Cart } from '@/types'

export interface CartItem {
    productId: string
    quantity: number
    variantId?: string
}

interface CartState {
    cart: Cart
    isUpdating: boolean
}

const initialState: CartState = {
    cart: {
        id: '',
        created_at: '',
        updated_at: '',
        user: '',
        items: [],
        item_count: 0,
    },
    isUpdating: false,
}

export const getCart = createAsyncThunk('cart/getCart', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`users/1c110288-2c26-4837-b4b7-bbd4a29b3832/my_cart/`)
        return response.data as Cart
    } catch (error) {
        console.error('Failed to get cart:', error)
        return rejectWithValue(error)
    }
})

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (
        payload: {
            cart_id: string
            product_id: string
            quantity: number
            product_variant_id?: string
        },
        { rejectWithValue, dispatch }
    ) => {
        try {
            const response = await axiosInstance.post(`cart-items/`, payload)
            if (response.status === 201 || response.status === 200) {
                dispatch(getCart())
            }
            return response
        } catch (error: any) {
            console.error('Failed to add to cart:', error)
            return rejectWithValue({
                message: error.message,
                code: error.code,
                response: error.response ? error.response.data : null,
            })
        }
    }
)

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (payload: { cartItemId: string }, { rejectWithValue, dispatch }) => {
    try {
        const response = await axiosInstance.delete(`/cart-items/${payload.cartItemId}/`)
        return response
    } catch (error) {
        console.error('Failed to remove from cart:', error)
        return rejectWithValue(error)
    }
})

export const updateCart = createAsyncThunk('cart/updateCart', async (payload: { cartItemId: string; quantity: number }, { rejectWithValue, dispatch }) => {
    try {
        const response = await axiosInstance.put(`/cart-items/${payload.cartItemId}/update_item_quantity/`, payload)
        return response
    } catch (error) {
        console.error('Failed to update cart:', error)
        return rejectWithValue(error)
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCart.pending, (state) => {
            state.isUpdating = true
        })
        builder.addCase(getCart.fulfilled, (state, action: PayloadAction<Cart>) => {
            state.cart = action.payload
            state.isUpdating = false
        })
        builder.addCase(getCart.rejected, (state) => {
            state.isUpdating = false
        })
        builder.addCase(addToCart.pending, (state) => {
            state.isUpdating = true
        })
        builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<AxiosResponse>) => {
            state.cart = action.payload.data
            state.isUpdating = false
        })
        builder.addCase(addToCart.rejected, (state) => {
            state.isUpdating = false
        })
    },
})

export default cartSlice.reducer