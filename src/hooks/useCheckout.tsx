import { useState, useCallback } from 'react';
import axiosInstance from '../helper/axiosInstance';

export function useCheckout() {
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentIntent, setPaymentIntent] = useState<any>(null);

  const initializeCheckout = useCallback(async (cartId: string) => {
    setCheckoutStatus('processing');
    try {
      const response = await axiosInstance.post('/api/checkout/initialize', { cartId });
      setPaymentIntent(response.data.paymentIntent);
      setCheckoutStatus('idle');
      return response.data;
    } catch (error) {
      setCheckoutStatus('error');
      throw error;
    }
  }, []);

  const processPayment = useCallback(async (paymentMethod: string) => {
    setCheckoutStatus('processing');
    try {
      const response = await axiosInstance.post('/api/checkout/process', {
        paymentIntent: paymentIntent.id,
        paymentMethod
      });
      setCheckoutStatus('success');
      return response.data;
    } catch (error) {
      setCheckoutStatus('error');
      throw error;
    }
  }, [paymentIntent]);

  return {
    checkoutStatus,
    initializeCheckout,
    processPayment
  };
}