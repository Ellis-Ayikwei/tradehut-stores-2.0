import { useCallback, useState } from 'react';

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isUpdating, setIsUpdating] = useState(false);

    const addToCart = useCallback(async (productId: string, quantity: number, variantId?: string) => {
        setIsUpdating(true);
        try {
            // API call to add to cart
            const response = await axios.post('/api/cart/add', {
                productId,
                quantity,
                variantId,
            });
            setCart(response.data.cart);
            return true;
        } catch (error) {
            console.error('Failed to add to cart:', error);
            return false;
        } finally {
            setIsUpdating(false);
        }
    }, []);

    const removeFromCart = useCallback(async (productId: string, variantId?: string) => {
        setIsUpdating(true);
        try {
            const response = await axios.post('/api/cart/remove', {
                productId,
                variantId,
            });
            setCart(response.data.cart);
            return true;
        } catch (error) {
            console.error('Failed to remove from cart:', error);
            return false;
        } finally {
            setIsUpdating(false);
        }
    }, []);

    return {
        cart,
        isUpdating,
        addToCart,
        removeFromCart,
    };
}
