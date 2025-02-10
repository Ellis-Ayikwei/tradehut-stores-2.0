'use client';

import { faMinus, faPlus, faShoppingBag, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CheckoutModal from '../components/Checkout/CheckoutModal';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useCurrency } from '../context/CurrencyContext';

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    maxQuantity: number;
    sku?: string;
    variant?: string;
}

export default function Cart() {
    const { formatPrice } = useCurrency();
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: '1',
            name: 'iPhone 15 Pro',
            price: 50,
            image: 'https://images.unsplash.com/photo-1638038772924-ef79cce2426d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            quantity: 1,
            maxQuantity: 5,
            sku: 'IP15P-128-SG',
            variant: 'Silver • 128GB',
        },
    ]);

    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

    const handleGuestCheckout = () => {
        setIsCheckoutModalOpen(false);
        // Implement guest checkout logic
    };

    const handleSignInCheckout = () => {
        setIsCheckoutModalOpen(false);
        // Implement authenticated checkout logic
    };

    const updateQuantity = async (id: string, newQuantity: number) => {
        setLoadingStates((prev) => ({ ...prev, [id]: true }));
        try {
            await new Promise((resolve) => setTimeout(resolve, 300));
            setCartItems((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              quantity: Math.min(Math.max(1, newQuantity), item.maxQuantity),
                          }
                        : item
                )
            );
        } finally {
            setLoadingStates((prev) => ({ ...prev, [id]: false }));
        }
    };

    const removeItem = async (id: string) => {
        setLoadingStates((prev) => ({ ...prev, [id]: true }));
        try {
            await new Promise((resolve) => setTimeout(resolve, 300));
            setCartItems((prev) => prev.filter((item) => item.id !== id));
        } finally {
            setLoadingStates((prev) => ({ ...prev, [id]: false }));
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
                <span className="text-sm text-gray-500 dark:text-gray-400">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</span>
            </div>

            {cartItems.length === 0 ? (
                <Card className="text-center py-12">
                    <div className="max-w-xs mx-auto">
                        <FontAwesomeIcon icon={faShoppingBag} className="text-6xl text-gray-300 dark:text-gray-600 mb-4 mx-auto" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
                        <Button variant="primary" size="lg" as={Link} to="/products" className="animate-float">
                            Continue Shopping
                        </Button>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <Card key={item.id} className="flex gap-4 p-4">
                                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">{item.name}</h3>
                                            {item.variant && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.variant}</p>}
                                            {item.sku && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">SKU: {item.sku}</p>}
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-600 transition-colors"
                                            disabled={loadingStates[item.id]}
                                            aria-label={`Remove ${item.name} from cart`}
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                                        <p className="text-lg font-bold text-primary-500 dark:text-primary-400">{formatPrice(item.price)}</p>

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors disabled:opacity-50"
                                                    disabled={item.quantity <= 1 || loadingStates[item.id]}
                                                    aria-label="Decrease quantity"
                                                >
                                                    <FontAwesomeIcon icon={faMinus} className="w-4 h-4" />
                                                </button>

                                                <span className="w-8 text-center">{item.quantity}</span>

                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors disabled:opacity-50"
                                                    disabled={item.quantity >= item.maxQuantity || loadingStates[item.id]}
                                                    aria-label="Increase quantity"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="sticky top-4 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                                    <span className="font-medium">{formatPrice(subtotal)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                                    <span className="font-medium">{subtotal > 100 ? <span className="text-green-500">FREE</span> : `${formatPrice(shipping)}`}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Tax</span>
                                    <span className="font-medium">{formatPrice(tax)}</span>
                                </div>

                                <div className="border-t dark:border-gray-700 pt-3 mt-3">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-primary-500 dark:text-primary-400">{formatPrice(total)}</span>
                                    </div>
                                </div>
                            </div>

                            <Button variant="primary" size="lg" className="w-full mt-6" onClick={() => setIsCheckoutModalOpen(true)} disabled={Object.values(loadingStates).some(Boolean)}>
                                {Object.values(loadingStates).some(Boolean) ? 'Processing...' : 'Proceed to Checkout'}
                            </Button>

                            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">Free shipping on orders over $100</p>
                        </Card>
                    </div>

                    <CheckoutModal
                        isOpen={isCheckoutModalOpen}
                        onClose={() => setIsCheckoutModalOpen(false)}
                        total={total}
                        onGuestCheckout={handleGuestCheckout}
                        onSignInCheckout={handleSignInCheckout}
                    />
                </div>
            )}
        </div>
    );
}
