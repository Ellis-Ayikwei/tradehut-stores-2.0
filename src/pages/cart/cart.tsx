'use client';

import { faMinus, faPlus, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutModal from '../../components/Checkout/CheckoutModal';
import ProductListPriceDisplay from '../../components/Products/productListPrice';
import { Button } from '../../components/ui/Button';
import { useCurrency } from '../../context/CurrencyContext';
import ConfirmDialog from '../../helper/confirmDialog';
import showMessage from '../../helper/showMessage';
import { AppDispatch, IRootState } from '../../store';
import { getCart, removeFromCart, updateCart } from '../../store/cartSlice';
import { CartItem, ProductVariant } from '../../types';

export default function Cart() {
    const dispatch = useDispatch<AppDispatch>();
    const { formatPrice } = useCurrency();
    const { cart, isUpdating: cartLoading } = useSelector((state: IRootState) => state.cart);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    const getAttribute = (variant: ProductVariant, name: string) => variant.attribute_values.find((av) => av.attribute.name === name);
    console.log('cart', cart.items);
    // Cart calculations

    const subtotal: number = cart.items.reduce((sum: number, item: CartItem) => sum + item.selected_variant.price * item.quantity, 0);
    const subtotalafterdiscount: number = cart.items.reduce((sum: number, item: CartItem) => sum + item.selected_variant.final_price * item.quantity, 0);
    const totalDiscount: number = cart.items.reduce((sum: number, item: CartItem) => sum + (item.selected_variant.price - item.selected_variant.final_price) * item.quantity, 0);
    const shipping = subtotalafterdiscount > 100000000 ? 0 : 9.99;
    const tax = subtotalafterdiscount * 0.1;
    const total = subtotalafterdiscount + shipping + tax;

    // Actions

    const handleSignInCheckout = () => {
        setIsCheckoutModalOpen(false);
        // Implement authenticated checkout logic
    };

    const updateQuantity = async (id: string, newQuantity: number) => {
        setLoadingStates((prev) => ({ ...prev, [id]: true }));
        try {
            await dispatch(
                updateCart({
                    cartItemId: id,
                    quantity: newQuantity,
                })
            ).unwrap();
            dispatch(getCart());
        } catch (err) {
        } finally {
            setLoadingStates((prev) => ({ ...prev, [id]: false }));
        }
    };

    const removeItem = async (id: string) => {
        try {
            const isConfirmed = await ConfirmDialog({
                title: 'Remove Item',
                message: 'Are you sure you want to remove this item from your cart?',
                finalQuestion: 'This action cannot be undone.',
                showSuccessMessage: true,
            });
            if (!isConfirmed) return;
            dispatch(
                removeFromCart({
                    cartItemId: id,
                })
            )
                .unwrap()
                .then((response) => {
                    if (response.status === 204) {
                        dispatch(getCart());
                        showMessage('Item removed from cart successfully', 'success');
                    }
                });
        } catch (err) {
        } finally {
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8 border-b pb-4">
                <h1 className="text-3xl font-medium text-gray-900 dark:text-white">Shopping Cart</h1>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {cart.items.length} item{cart.items.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {cart.items.length === 0 ? (
                <div className="text-center py-16">
                    <div className="max-w-xs mx-auto">
                        <FontAwesomeIcon icon={faShoppingBag} className="text-8xl text-gray-300 dark:text-gray-600 mb-6 mx-auto" />
                        <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
                        <Link to="/products" className="btn btn-primary  hover:bg-yellow-600 text-black animate-bounce">
                            Shop products
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-8">
                        {cart.items.map((item) => {
                            const variant = item.selected_variant;
                            const colorAttr = getAttribute(variant, 'Color');
                            const sizeAttr = getAttribute(variant, 'Size');
                            const styleAttr = getAttribute(variant, 'Style');

                            return (
                                <div key={item.item_id} className="flex flex-col sm:flex-row gap-4 py-4 border-b">
                                    {/* Product Image */}
                                    <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-md overflow-hidden shrink-0">
                                        <img src={item.main_product_image} alt={item.name} className="w-full h-full object-contain" />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col h-full justify-between">
                                            {/* Top Section */}
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.name}</h3>

                                                {/* Variant Attributes */}
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {colorAttr && (
                                                        <div className="flex items-center gap-1.5 text-sm">
                                                            {colorAttr.color_code && (
                                                                <span className="w-4 h-4 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: colorAttr.color_code }} />
                                                            )}
                                                            <span>{colorAttr.value}</span>
                                                        </div>
                                                    )}
                                                    {sizeAttr && <span className="text-sm bg-gray-100 px-2 py-1 rounded">Size: {sizeAttr.value}</span>}
                                                    {styleAttr && <span className="text-sm bg-gray-100 px-2 py-1 rounded">{styleAttr.value}</span>}
                                                </div>

                                                <p className="text-xs text-gray-500 mt-2">SKU: {variant.sku}</p>
                                            </div>

                                            {/* Bottom Controls */}
                                            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                                {/* Quantity Selector */}
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center border rounded-md">
                                                        <button
                                                            onClick={() => updateQuantity(item.item_id, item.quantity - 1)}
                                                            className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-r disabled:cursor-not-allowed"
                                                            disabled={item.quantity <= 1 || loadingStates[item.item_id]}
                                                        >
                                                            <FontAwesomeIcon icon={faMinus} className="w-3 h-3" />
                                                        </button>
                                                        <span className="w-12 text-center px-2">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.item_id, item.quantity + 1)}
                                                            className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-l disabled:cursor-not-allowed"
                                                            disabled={item.quantity >= variant.quantity || loadingStates[item.item_id]}
                                                        >
                                                            <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <button onClick={() => removeItem(item.item_id)} className="text-red-300 hover:text-red-600 text-sm underline">
                                                        <Trash2 />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <p className="text-lg font-medium text-gray-900 dark:text-white">
                                                    {' '}
                                                    <ProductListPriceDisplay
                                                        price={Number(item.selected_variant.price)}
                                                        discountPercent={Number(item.discount_percentage)}
                                                        final_price={Number(item.selected_variant.final_price)}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4 lg:pl-4 mt-8 lg:mt-0">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                            <h2 className="text-xl font-medium mb-4">Order Summary</h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span>Items ({cart.items.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Discount :</span>
                                    <span className="text-red-500">-{formatPrice(totalDiscount)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Total after discount ({cart.items.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                                    <span>{formatPrice(subtotalafterdiscount)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping:</span>
                                    <span>{subtotal > 1000000 ? 'FREE' : formatPrice(shipping)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Estimated Tax:</span>
                                    <span>{formatPrice(tax)}</span>
                                </div>

                                <div className="border-t pt-3 mt-3">
                                    <div className="flex justify-between font-medium">
                                        <span>Total:</span>
                                        <span className="text-lg">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-md py-3 mt-4"
                                    onClick={() => setIsCheckoutModalOpen(true)}
                                >
                                    Proceed to Checkout
                                </Button>

                                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">By placing your order, you agree to Tradehut's Conditions of Use and Privacy Notice.</p>
                            </div>
                        </div>
                    </div>

                    <CheckoutModal isOpen={isCheckoutModalOpen} onClose={() => setIsCheckoutModalOpen(false)} total={total} onGuestCheckout={() => {}} onSignInCheckout={() => {}} />
                </div>
            )}
        </div>
    );
}
