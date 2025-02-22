'use client';

import { ArrowLeftIcon, CheckCircleIcon, HeartIcon, RefreshCwIcon, ShieldCheckIcon, ShoppingCartIcon, StarIcon, TruckIcon } from 'lucide-react';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ProductPriceDisplay from '../../components/pricing/prodDetailPricer';
import { Button } from '../../components/ui/Button';
import { useCurrency } from '../../context/CurrencyContext';
import showMessage from '../../helper/showMessage';
import { AppDispatch, IRootState } from '../../store';
import { addToCart } from '../../store/cartSlice';
import { fetchAProduct } from '../../store/productSlice';
import { ProductVariant } from '../../types';
import AddReview from './addNewReview';
import ProductVariantSelector from './productVariant';

interface ProductDetail {
    id: string;
    created_at: string;
    updated_at: string;
    status: string;
    name: string;
    keywords: string;
    description: string;
    slug: string;
    price: string;
    main_product_image: string;
    min_amount: number;
    thin: string;
    inventory_level: number;
    available: boolean;
    condition: string;
    is_spare_part: boolean;
    requires_installation: boolean;
    meta_title: string;
    meta_description: string;
    average_rating: string;
    total_reviews: number;
    discount_price: string;
    discount_percentage: number;
    category: string;
    sub_category: string;
    brand: string;
    seller: {
        username: string;
        id: string;
    };
    variants: Array<{
        product: string;
        name: string;
        sku: string;
        price: string;
        quantity: number;
        min_buy_amount: number;
        attribute_values: Array<{
            attribute: string;
            value: string;
        }>;
        images: Array<unknown>;
        id: string;
        created_at: string;
        updated_at: string;
    }>;
    rating: number;
    reviews: Array<{
        product: string;
        user: {
            username: string;
            id: string;
        };
        rating: number;
        comment: string;
        id: string;
        created_at: string;
        updated_at: string;
    }>;
}

const mockData = {
    product: {
        id: 'iphone-13-pro',
        name: 'iPhone 13 Pro',
        brand: 'Apple',
        price: 999,
        originalPrice: 1199,
        discountPercentage: 17,
        description: 'Powerful smartphone with pro camera system, A15 Bionic chip, and stunning Super Retina XDR display.',
        images: [
            'https://images.unsplash.com/photo-1616348436168-de43ad0db179',
            'https://images.unsplash.com/photo-1638038772924-ef79cce2426d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1726574778294-adfb9ee2e5ca?q=80&w=1907&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1687170468710-bc75e9d8a9cb?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1668184162994-42a4fb7667b7?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
        features: ['6.1-inch Super Retina XDR display', 'Pro camera system with 12MP sensors', 'A15 Bionic chip with 5-core GPU', '5G capable'],
        specs: [
            { label: 'Storage', value: '128GB', price: 999 },
            { label: 'Storage', value: '256GB', price: 1099 },
            { label: 'Storage', value: '512GB', price: 1299 },
        ],
        inStock: true,
        fastShipping: true,
    },
    reviews: [
        {
            id: 1,
            name: 'John Doe',
            rating: 5,
            date: '2023-07-15',
            comment: 'Absolutely love this phone! The camera is amazing and the performance is top-notch.',
            verified: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            rating: 4,
            date: '2023-07-10',
            comment: 'Great phone, but I wish the battery life was a bit better.',
            verified: true,
        },
        {
            id: 3,
            name: 'Mike Johnson',
            rating: 5,
            date: '2023-07-05',
            comment: "Best smartphone I've ever owned. Highly recommend!",
            verified: true,
        },
    ],
    recommendedProducts: [
        {
            id: 'samsung-s21',
            name: 'Samsung Galaxy S21',
            price: 799,
            image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff13',
        },
        {
            id: 'google-pixel-6',
            name: 'Google Pixel 6',
            price: 699,
            image: 'https://images.unsplash.com/photo-1581279813209-352b93a2c495',
        },
        {
            id: 'iphone-12',
            name: 'iPhone 12',
            price: 599,
            image: 'https://images.unsplash.com/photo-1578598573025-640b31392a90',
        },
    ],
    returnPolicy: {
        period: '30 Days',
        conditions: ['Item must be unused and in original packaging', 'Original receipt or proof of purchase required', 'Refund processed within 5-7 business days'],
    },
    shippingInfo: {
        methods: [
            { name: 'Standard Shipping', time: '3-5 Business Days', price: 'Free' },
            { name: 'Express Shipping', time: '1-2 Business Days', price: '$19.99' },
            { name: 'Next Day Delivery', time: 'Next Business Day', price: '$29.99' },
        ],
        freeShippingThreshold: 500,
    },
};

export default function ComprehensiveProductDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    const { formatPrice } = useCurrency();

    const [activeTab, setActiveTab] = useState('details');
    const [quantity, setQuantity] = useState(1);
    const [selectedSpec, setSelectedSpec] = useState('128GB');
    const [selectedImage, setSelectedImage] = useState(0);
    const [wishlisted, setWishlisted] = useState(false);
    const [selectedVariantConfig, setSelectedVariantConfig] = useState<{ variant: ProductVariant; attributes: Record<string, string>; isComplete: boolean } | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const cart_id = '8b032fd277d54c49a02f16bc5933f8c7';
    const handleVariantSelect = (config: { variant: ProductVariant; attributes: Record<string, string>; isComplete: boolean }) => {
        setSelectedVariantConfig(config);
    };

    console.log(selectedVariantConfig === null);
    console.log('the selected varaiant', selectedVariantConfig);

    // useEffect(() => {
    //     if (id) {
    //         setIsLoading(true);
    //         dispatch(fetchAProduct(id)).finally(() => setIsLoading(false));
    //     }
    // }, [dispatch, id]);

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            setError(null);
            dispatch(fetchAProduct(id))
                .unwrap()
                .catch((err) => setError(err.message))
                .finally(() => setIsLoading(false));
        }
    }, [dispatch, id]);

    const productDetail = useSelector((state: IRootState) => state.products.productDetail);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    const { product, reviews, recommendedProducts, returnPolicy, shippingInfo } = mockData;

    function handleToggleWishlist() {
        setWishlisted((prev) => !prev);
    }

    function handleAddToCart(event: MouseEvent<HTMLButtonElement>): void {
        if (!selectedVariantConfig || !selectedVariantConfig.isComplete) {
            // alert('Please select a valid variant configuration.');
            showMessage('Please select a valid variant configuration', 'error');
            return;
        }
        dispatch(
            addToCart({
                cart_id: cart_id,
                product_id: productDetail.id,
                quantity,
                product_variant_id: selectedVariantConfig.variant.id,
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
    }

    function handleBuyNow(event: MouseEvent<HTMLButtonElement>): void {
        if (!selectedVariantConfig || !selectedVariantConfig.isComplete) {
            alert('Please select a valid variant configuration.');
            return;
        }
        // For demonstration, we simply navigate to a checkout route with query params.
        navigate(`/checkout?productId=${productDetail.id}&variantId=${selectedVariantConfig.variant.id}&quantity=${quantity}`);
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-6 lg:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <div className="mb-4 lg:mb-6">
                    <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300">
                        <ArrowLeftIcon className="w-5 h-5" />
                        Back to Products
                    </Link>
                </div>

                {/* Main Product Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-8">
                        {/* Image Gallery */}
                        <div className="lg:w-1/2">
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 object-cover"
                                />
                                <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium text-white ${product.inStock ? 'bg-green-600' : 'bg-red-600'}`}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </div>
                            </div>
                            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`shrink-0 w-20 h-20 rounded-lg border-2 transition-all ${selectedImage === index ? 'border-primary-500' : 'border-transparent'}`}
                                    >
                                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="lg:w-1/2 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.brand}</p>
                                        <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
                                    </div>
                                    <button
                                        onClick={handleToggleWishlist}
                                        className={`p-2 rounded-full ${wishlisted ? 'text-red-600 bg-red-100' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    >
                                        <HeartIcon className="w-6 h-6" fill={wishlisted ? 'currentColor' : 'none'} />
                                    </button>
                                </div>

                                {!selectedVariantConfig?.isComplete && <ProductPriceDisplay productDetail={productDetail} />}

                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2">Highlights</h3>
                                    <ul className="space-y-2">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-sm">
                                                <CheckCircleIcon className="w-4 h-4 mr-2 text-green-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <ProductVariantSelector productDetail={productDetail} onConfigChange={(config) => handleVariantSelect(config)} />

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-4">
                                        <label className="text-sm font-medium">Quantity:</label>
                                        <div className="flex items-center border rounded-lg dark:border-gray-600">
                                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                -
                                            </button>
                                            <span className="px-4 py-2 w-12 text-center dark:text-white">{quantity}</span>
                                            <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button className="flex-1 py-3 text-base" onClick={handleAddToCart}>
                                        <ShoppingCartIcon className="w-5 h-5 mr-2" />
                                        Add to Cart
                                    </Button>
                                    <Button variant="outline" className="flex-1 py-3 text-base">
                                        Buy Now
                                    </Button>
                                </div>

                                <div className="grid grid-cols-3 gap-4 text-center py-4 border-t dark:border-gray-700">
                                    <div className="flex flex-col items-center">
                                        <TruckIcon className="w-6 h-6 text-blue-500 mb-2" />
                                        <span className="text-xs">Fast Shipping</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <ShieldCheckIcon className="w-6 h-6 text-green-500 mb-2" />
                                        <span className="text-xs">Secure Payment</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <CheckCircleIcon className="w-6 h-6 text-purple-500 mb-2" />
                                        <span className="text-xs">Easy Returns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <div className="border-b dark:border-gray-700">
                        <nav className="flex overflow-x-auto px-4">
                            {['details', 'reviews', 'shipping'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-3 font-medium whitespace-nowrap ${
                                        activeTab === tab ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                                    }`}
                                >
                                    {tab === 'reviews' ? `Reviews (${productDetail?.reviews?.length})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-4 lg:p-6">
                        {activeTab === 'details' && (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                                    <dl className="space-y-3">
                                        {product.specs.map((spec) => (
                                            <div key={spec.value} className="flex justify-between py-2 border-b dark:border-gray-700">
                                                <dt className="text-gray-600 dark:text-gray-300">{spec.label}</dt>
                                                <dd className="font-medium">{spec.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Features</h3>
                                    <ul className="space-y-3">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-1" />
                                                <span className="flex-1">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="space-y-6">
                                <AddReview
                                    productId={product.id}
                                    onSubmit={async (review) => {
                                        // Add your review submission logic here
                                        console.log('Submitting review:', review);
                                        // Example: await api.submitReview(product.id, review);
                                        alert('Thank you for your review!');
                                    }}
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon key={i} className={`w-5 h-5 ${i < Math.floor(productDetail.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <span className="font-medium">{productDetail.rating.toFixed(1)} out of 5</span>
                                    </div>
                                    <span className="text-sm text-gray-500">{productDetail?.reviews?.length} reviews</span>
                                </div>

                                <div className="space-y-4">
                                    {productDetail.reviews.map((review: any) => (
                                        <div key={review.id} className="border-b dark:border-gray-700 pb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{review.user.username}</span>
                                                    {review.verified && <CheckCircleIcon className="w-4 h-4 text-green-500" />}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                                            <time className="text-sm text-gray-500 mt-2 block">{review.date}</time>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'shipping' && (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Shipping Options</h3>
                                    <div className="space-y-4">
                                        {shippingInfo.methods.map((method) => (
                                            <div key={method.name} className="border-b dark:border-gray-700 pb-4">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">{method.name}</p>
                                                        <p className="text-sm text-gray-500">{method.time}</p>
                                                    </div>
                                                    <span className="font-medium">{method.price}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Returns & Exchanges</h3>
                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                        <p className="font-medium mb-2">{returnPolicy.period} Return Policy</p>
                                        <ul className="space-y-2">
                                            {returnPolicy.conditions.map((condition, index) => (
                                                <li key={index} className="flex items-start">
                                                    <RefreshCwIcon className="w-5 h-5 text-blue-500 mr-2 mt-1" />
                                                    <span className="flex-1">{condition}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recommended Products */}
                <section className="mt-6">
                    <h2 className="text-xl font-bold mb-4">You Might Also Like</h2>
                    <div className="flex overflow-x-auto gap-4 pb-4">
                        {recommendedProducts.map((product) => (
                            <div key={product.id} className="w-64 shrink-0 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-medium line-clamp-2 mb-2">{product.name}</h3>
                                    <p className="text-lg font-bold text-primary-600">{formatPrice(product.price)}</p>
                                    <Button className="w-full mt-2" size="sm">
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
