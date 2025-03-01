'use client';

import {
    faArrowRight,
    faCamera,
    faCouch,
    faDumbbell,
    faGamepad,
    faHeadphones,
    faHome,
    faLaptop,
    faLightbulb,
    faMicrochip,
    faMobile,
    faMusic,
    faNetworkWired,
    faPen,
    faPlug,
    faShieldAlt,
    faToolbox,
    faTruck,
    faTshirt,
    faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import SelectedProductsSection from '../components/common/selectedProductsForIIndex';
import ScrollToTop from '../components/ScrollToTop';
import { products } from '../data/products';
import { AppDispatch } from '../store';
import { fetchBestSellers, fetchDiscountedProducts, fetchFeaturedProducts, fetchNewArrivals, fetchPOM, fetchTopRatedProducts, fetchTrendingProducts } from '../store/productSlice';

// Lazy load components
const PromoBanner = lazy(() => import('../components/Banner/PromoBanner'));
const Hero = lazy(() => import('../components/Layouts/Hero'));

// = lazy(() => import('../components/common/selectedProductsForIIndex'));

const categories = [
    {
        id: 1,
        title: 'Smartphones',
        icon: faMobile,
        link: '/category/phones',
        image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179',
        desc: 'Latest smartphones and accessories',
    },
    {
        id: 2,
        title: 'Laptops',
        icon: faLaptop,
        link: '/category/laptops',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7',
        desc: 'High-performance laptops and peripherals',
    },
    {
        id: 3,
        title: 'Accessories',
        icon: faHeadphones,
        link: '/category/accessories',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb',
        desc: 'Top-quality accessories for all devices',
    },
    {
        id: 4,
        title: 'Toys & Games',
        icon: faGamepad,
        image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070',
        desc: 'Educational toys & family entertainment',
    },
    {
        id: 5,
        title: 'Computing & Peripherals',
        icon: faLaptop,
        image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070',
        desc: 'Laptops, PCs & accessories',
    },
    {
        id: 6,
        title: 'Photography',
        icon: faCamera,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1938',
        desc: 'Cameras, lenses & studio gear',
    },
    {
        id: 7,
        title: 'Sports & Outdoor',
        icon: faDumbbell,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2121',
        desc: 'Fitness equipment & adventure gear',
    },
    {
        id: 8,
        title: 'Tools',
        icon: faToolbox,
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070',
        desc: 'Professional & DIY tools',
    },
    {
        id: 9,
        title: 'Home Appliances',
        icon: faHome,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070',
        desc: 'Smart home essentials',
    },
    {
        id: 10,
        title: 'Accessories & Connectivity',
        icon: faPlug,
        image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        desc: 'Cables, adapters & connectors',
    },
    {
        id: 11,
        title: 'Furniture & Interior',
        icon: faCouch,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070',
        desc: 'Modern home solutions',
    },
    {
        id: 12,
        title: 'Clothing & Apparel',
        icon: faTshirt,
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070',
        desc: 'Fashion for all styles',
    },
    {
        id: 13,
        title: 'Speakers & Sound',
        icon: faMusic,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070',
        desc: 'Audio systems & equipment',
    },
    {
        id: 14,
        title: 'Stationery',
        icon: faPen,
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070',
        desc: 'Premium writing supplies',
    },
    {
        id: 15,
        title: 'Electricals',
        icon: faLightbulb,
        image: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070',
        desc: 'Lighting & power solutions',
    },
    {
        id: 16,
        title: 'Electronic Components',
        icon: faMicrochip,
        image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070',
        desc: 'Circuit boards & parts',
    },
    {
        id: 17,
        title: 'Networking',
        icon: faNetworkWired,
        image: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070',
        desc: 'Routers & connectivity gear',
    },
    {
        id: 18,
        title: 'Gaming & VR',
        icon: faGamepad,
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070',
        desc: 'Consoles & virtual reality',
    },
    {
        id: 19,
        title: 'Health & Fitness',
        icon: faDumbbell,
        image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974',
        desc: 'Wellness & exercise gear',
    },
    {
        id: 20,
        title: 'Mobile & Accessories',
        icon: faMobile,
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1967',
        desc: 'Smartphones & mobile tech',
    },
];

const features = [
    {
        icon: faTruck,
        title: 'Free Shipping',
        description: 'On orders over $100',
    },
    {
        icon: faShieldAlt,
        title: 'Secure Shopping',
        description: '100% protected payments',
    },
    {
        icon: faUndo,
        title: 'Easy Returns',
        description: '30-day return policy',
    },
];

// Define settings for the carousel
const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

export default function Home() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [sampleProducts] = useState(products);
    const dispatch = useDispatch<AppDispatch>();

    const { featuredProducts, newArrivals, discountedProducts, trendingProducts, bestSellers, topRatedProducts, productOfTheMonth } = useSelector((state: any) => state.products);

    useEffect(() => {
        console.log('index r');
        dispatch(fetchFeaturedProducts());
        dispatch(fetchNewArrivals());
        dispatch(fetchDiscountedProducts());
        dispatch(fetchTrendingProducts());
        dispatch(fetchBestSellers());
        dispatch(fetchTopRatedProducts());
        dispatch(fetchPOM());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Suspense fallback={<div>Loading...</div>}>
                <Hero featuredProducts={featuredProducts} ProductOftheMonth={productOfTheMonth} />
            </Suspense>

            <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Featured Categories */}
                <section className="py-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {categories.map((category) => (
                            <motion.div key={category.id} whileHover={{ y: -5, scale: 1.05 }} className="relative group overflow-hidden rounded-xl shadow-lg transition-transform duration-300">
                                <img
                                    src={`/assets/images/categories/${category.title}.avif` ? `/assets/images/categories/${category.title}.avif` : `/assets/images/categories/${category.title}.jpeg`}
                                    alt={category.title}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <FontAwesomeIcon icon={category.icon} className="h-8 w-8 mb-3" />
                                        <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                                        <p className="text-sm">{category.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Best Sellers */}
                <section id="products-section" className="py-12">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Best Sellers</h2>
                        <button className="text-primary-600 hover:text-primary-700 font-medium">
                            View All Products <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                        </button>
                    </div>
                    {/* Add a grid or carousel for best sellers */}
                </section>
                <SelectedProductsSection products={sampleProducts} sectionTitle="New Arrivals" productLimit={6} />
                <SelectedProductsSection products={sampleProducts} sectionTitle="Best Sellers" productLimit={6} />
                <SelectedProductsSection products={sampleProducts} sectionTitle="Trending Products" productLimit={6} />
                <SelectedProductsSection products={sampleProducts} sectionTitle="Discounted" productLimit={6} />
                <SelectedProductsSection products={sampleProducts} sectionTitle="Popular Products" productLimit={6} />

                {/* Promo Banner */}
                <Suspense fallback={<div>Loading...</div>}>
                    <section className="py-12">
                        <PromoBanner />
                    </section>
                </Suspense>

                {/* Features Grid */}
                <section className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                        {features.map((feature) => (
                            <motion.div key={feature.title} whileHover={{ scale: 1.05 }} className="flex items-center p-4 transition-transform duration-300">
                                <div className="flex-shrink-0 p-3 bg-primary-100 dark:bg-gray-700 rounded-lg">
                                    <FontAwesomeIcon icon={feature.icon} className="h-6 w-6 text-primary-600 dark:text-white" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="py-12 bg-primary-50 dark:bg-gray-800">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Stay Updated</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">Subscribe to our newsletter for exclusive deals and tech updates</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">Subscribe</button>
                        </div>
                    </div>
                </section>

                {/* Carousel Section */}
                <section className="py-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Featured Products</h2>
                    <Slider {...carouselSettings}>
                        {sampleProducts.slice(0, 6).map((product) => (
                            <div key={product.id} className="p-4">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-xl" loading="lazy" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{product.name}</h3>
                                        <p className="text-primary-600 font-bold">${product.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </section>

                {/* Testimonials Section */}
                <section className="py-12 bg-gray-100 dark:bg-gray-800">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">What Our Customers Say</h2>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                            <p className="text-gray-600 dark:text-gray-300">"Great service and fast delivery. Highly recommend!"</p>
                            <div className="mt-4">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">John Doe</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Verified Buyer</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                            <p className="text-gray-600 dark:text-gray-300">"Amazing products at unbeatable prices."</p>
                            <div className="mt-4">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Jane Smith</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Verified Buyer</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <ScrollToTop />
        </div>
    );
}
