import { useState, useCallback } from 'react';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const addToWishlist = useCallback(async (productId: string) => {
    setIsUpdating(true);
    try {
      await axios.post('/api/wishlist/add', { productId });
      setWishlist(prev => [...prev, productId]);
      return true;
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const removeFromWishlist = useCallback(async (productId: string) => {
    setIsUpdating(true);
    try {
      await axios.post('/api/wishlist/remove', { productId });
      setWishlist(prev => prev.filter(id => id !== productId));
      return true;
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return {
    wishlist,
    isUpdating,
    addToWishlist,
    removeFromWishlist
  };
}