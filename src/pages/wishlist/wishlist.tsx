'use client';

import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useCurrency } from '../../context/CurrencyContext';
import showMessage from '../../helper/showMessage';
import { addToCart } from '../../store/cartSlice';
import { AppDispatch, IRootState } from '../../store/index';
import { addToWishlist, getWishlist } from '../../store/wishListSlice';

interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    brand: string;
    inStock: boolean;
    rating: number;
}

export default function Wishlist() {
    const dispatch = useDispatch<AppDispatch>();
    const { formatPrice } = useCurrency();
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
        {
            id: '1',
            name: 'MacBook Pro 16"',
            price: 2499.99,
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
            brand: 'Apple',
            inStock: true,
            rating: 4.9,
        },
        // Add more items...
    ]);

    const { wishlist, isUpdating } = useSelector((state: IRootState) => state.wishlist);

    useEffect(() => {
        dispatch(getWishlist());
    }, [dispatch]);

    const removeFromWishlist = (id: string) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleAddToWishlist = (id: string) => {
        dispatch(addToWishlist({ wishlist_id: '08143a75-e9f2-4044-8fc2-b4ff3abb6e44', product_id: id }))
            .unwrap()
            .then((response) => {
                if (response.status === 201) {
                    showMessage('Product added to wishlist successfully', 'success');
                }
                if (response.status === 200) {
                    showMessage('Product removed from wishlist successfully', 'success');
                }
            })
            .catch((error) => {
                showMessage('Error adding product to wishlist', 'error');
                console.error('Error adding product to wishlist:', error);
            });
    };

    const handleAddToCart = (cartId: string, productId: string, quantity : number = 1, variantId: string) => {
        dispatch(
            addToCart({
                cart_id: cartId,
                product_id: productId,
                quantity: quantity,
                product_variant_id: variantId,
            })
        )
            .unwrap()
            .then((response) => {
                console.log(response.status);
                if (response.status === 201) {
                    showMessage('Product added to cart successfully', 'success');
                }
                if (response.status === 409) {
                    showMessage('Item Already in cart', 'error');
                }
            })
            .catch((err) => showMessage(err.response.detail, 'error'));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{wishlistItems.length} items</span>
                </div>
            </div>

            {wishlistItems.length === 0 ? (
                <Card className="text-center py-12">
                    <FontAwesomeIcon icon={faHeart} className="text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Start adding items you love!</p>
                    <Button variant="primary" size="lg" className="animate-float">
                        Explore Products
                    </Button>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.items.map((item) => (
                        <Card key={item.item_id} className="relative group">
                            <div className="absolute top-4 right-4 z-10 space-x-2">
                                <button onClick={() => handleAddToWishlist(item.id)} className="p-2 bg-white dark:bg-crypto-card rounded-full shadow-lg hover:scale-110 transition-transform">
                                    {/* <FontAwesomeIcon icon={faTrash} className="text-red-500 w-4 h-4" /> */}
                                    <Trash2 className="text-red-500 w-4 h-4" />
                                </button>
                            </div>
                            <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                                <Link to={`/products/${item.product_id}`}>
                                    <img src={item.main_product_image.url} alt={item.name} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300" />
                                </Link>

                                {item.inventory_level <= 0 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <span className="text-white font-semibold">Out of Stock</span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Link to={`/products/${item.product_id}`}>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                                        </Link>
                                    </div>
                                    <p className="text-lg font-bold text-primary-500">{formatPrice(Number(item.price))}</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`text-sm ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                            ★
                                        </span>
                                    ))}
                                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{item.rating}</span>
                                </div>
                                <Button onClick={() => handleAddToCart("8b032fd277d54c49a02f16bc5933f8c7", item.product_id, 1, item.default_variant)} variant="primary" className="w-full mt-4" disabled={item.inventory_level <= 0}>
                                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                                    Add to Cart
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
