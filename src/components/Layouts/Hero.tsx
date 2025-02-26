'use client';

import { faFire, faStar, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const featuredProducts = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        price: 999,
        img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569',
        badge: 'Bestseller',
    },
    {
        id: 2,
        name: 'Sony WH-1000XM5',
        price: 349,
        img: 'https://images.unsplash.com/photo-1519326844852-704caea5679e?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        badge: '30% Off',
    },
    {
        id: 3,
        name: 'MacBook Pro 16"',
        price: 2499,
        img: 'https://images.unsplash.com/photo-1612383401559-c32a290d6b17?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        badge: 'New Arrival',
    },
];

export default function Hero() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" aria-labelledby="main-heading">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32">
                <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
                    {/* Left Column */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="space-y-6">
                        <div
                            role="alert"
                            className="inline-flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2 rounded-full mb-6"
                            aria-label="Summer sale live with 50-70% off"
                        >
                            <FontAwesomeIcon icon={faFire} className="mr-2" aria-hidden="true" />
                            Summer Sale Live - 50-70% Off
                        </div>

                        <h1 id="main-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                            Premium Tech,
                            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Unbeatable Prices</span>
                        </h1>

                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">Shop our curated selection of top-rated electronics with exclusive discounts and free expedited shipping.</p>

                        {/* Featured Products Grid */}
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8"
                            initial="hidden"
                            animate={isInView ? 'visible' : ''}
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } },
                            }}
                        >
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </motion.div>

                        <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2" aria-label="Rated 4.9 out of 5 stars">
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon key={i} icon={faStar} className={`text-${i < 4 ? 'yellow-400' : 'gray-300'} w-5 h-5`} aria-hidden="true" />
                                ))}
                                <span className="sr-only">Rated 4.9 out of 5 stars</span>
                                <span aria-hidden="true">4.9/5 (25K+ Reviews)</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-750 rounded-2xl p-8"
                    >
                        <div className="space-y-4 text-center">
                            <span className="inline-block bg-green-500 text-white px-4 py-1 rounded-full">Product of the Month</span>
                            <h2 className="text-3xl font-bold dark:text-white">Samsung S24 Ultra</h2>
                            <p className="text-primary-500 text-2xl font-bold">
                                $999
                                <span className="text-gray-500 line-through text-lg ml-2">$1,299</span>
                            </p>
                            <div className="relative h-full w-full">
                                <img
                                    src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Samsung S24 Ultra in space black color"
                                    className="object-cover w-full h-full hover:scale-105 transition-transform"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <button
                                className="w-full py-4 bg-primary-500 hover:bg-priamry-600 text-white rounded-xl font-medium transition-colors duration-200 transform hover:scale-[1.02] active:scale-95"
                                aria-label="Customize and buy Samsung S24 Ultra"
                            >
                                Customize & Buy Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

interface Product {
    id: number;
    name: string;
    price: number;
    img: string;
    badge?: string;
}

const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
        }}
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
        role="article"
        aria-labelledby={`product-${product.id}-title`}
    >
        <div className="relative mb-3 h-40">
            <img src={product.img} alt="" className="object-contain" loading="lazy" aria-hidden="true" />
            {product.badge && <span className="absolute top-2 left-2 bg-primary-500 text-white px-2 py-1 rounded-md text-xs">{product.badge}</span>}
        </div>
        <h3 id={`product-${product.id}-title`} className="font-medium dark:text-white">
            {product.name}
        </h3>
        <div className="flex items-center justify-between mt-2">
            <span className="text-primary-500 font-bold">${product.price}</span>
            <button className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-gray-600" aria-label={`Quick view ${product.name}`}>
                Quick View
            </button>
        </div>
    </motion.div>
);
