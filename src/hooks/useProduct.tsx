import { useState, useEffect } from 'react';
import axiosInstance from '../helper/axiosInstance';
import { Product } from '../types';

export function useProduct(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/products/${productId}`);
        if (mounted) {
          setProduct(response.data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch product'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchProduct();
    return () => { mounted = false; };
  }, [productId]);

  return { product, loading, error };
}