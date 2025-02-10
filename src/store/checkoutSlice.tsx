import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type CheckoutStatus = 'idle' | 'processing' | 'success' | 'error';

interface CheckoutState {
  status: CheckoutStatus;
  paymentIntent: any | null;
}

const initialState: CheckoutState = {
  status: 'idle',
  paymentIntent: null,
};

// Thunk to initialize checkout (e.g., creating a payment intent)
export const initializeCheckout = createAsyncThunk(
  'checkout/initializeCheckout',
  async (cartId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/checkout/initialize', { cartId });
      // Expecting response.data to contain a paymentIntent object
      return response.data;
    } catch (error) {
      console.error('Failed to initialize checkout:', error);
      return rejectWithValue(error);
    }
  }
);

// Thunk to process the payment
export const processPayment = createAsyncThunk(
  'checkout/processPayment',
  async (paymentMethod: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { checkout: CheckoutState };
      if (!state.checkout.paymentIntent || !state.checkout.paymentIntent.id) {
        throw new Error('No payment intent available');
      }
      const response = await axios.post('/api/checkout/process', {
        paymentIntent: state.checkout.paymentIntent.id,
        paymentMethod,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to process payment:', error);
      return rejectWithValue(error);
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    resetCheckout(state) {
      state.status = 'idle';
      state.paymentIntent = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeCheckout.pending, (state) => {
      state.status = 'processing';
    });
    builder.addCase(
      initializeCheckout.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.paymentIntent = action.payload.paymentIntent;
        state.status = 'idle';
      }
    );
    builder.addCase(initializeCheckout.rejected, (state) => {
      state.status = 'error';
    });

    // Handle processPayment lifecycle
    builder.addCase(processPayment.pending, (state) => {
      state.status = 'processing';
    });
    builder.addCase(processPayment.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(processPayment.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const { resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
