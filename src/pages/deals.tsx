'use client';

import { faClock, faStar } from '@fortawesome/free-regular-svg-icons';
import { faBox, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Deal {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    category: string;
    discountPercentage: number;
    endsAt: string;
    description: string;
    rating: number;
}

export default function Deals() {
    const [deals] = useState<Deal[]>([
        {
            id: '1',
            name: 'iPhone 15 Pro Max',
            price: 999,
            originalPrice: 1199,
            image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569',
            category: 'Phones',
            discountPercentage: 17,
            endsAt: '2024-04-01',
            description: 'Latest iPhone with revolutionary features',
            rating: 4.8,
        },
        {
            id: '2',
            name: 'MacBook Air M2',
            price: 999,
            originalPrice: 1299,
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
            category: 'Laptops',
            discountPercentage: 23,
            endsAt: '2024-04-01',
            description: 'Supercharged by M2 chip',
            rating: 4.9,
        },
        {
            id: '3',
            name: 'Sony WH-1000XM5',
            price: 299,
            originalPrice: 399,
            image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb',
            category: 'Audio',
            discountPercentage: 25,
            endsAt: '2024-04-01',
            description: 'Industry-leading noise cancellation',
            rating: 4.7,
        },
        {
            id: '4',
            name: 'Samsung Galaxy S24 Ultra',
            price: 899,
            originalPrice: 1199,
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf',
            category: 'Phones',
            discountPercentage: 25,
            endsAt: '2024-04-01',
            description: 'Ultimate Android experience',
            rating: 4.8,
        },
        {
            id: '5',
            name: 'iPad Pro 12.9"',
            price: 899,
            originalPrice: 1099,
            image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
            category: 'Tablets',
            discountPercentage: 18,
            endsAt: '2024-04-01',
            description: 'Your next computer is not a computer',
            rating: 4.9,
        },
        {
            id: '6',
            name: 'Dell XPS 15',
            price: 1499,
            originalPrice: 1899,
            image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45',
            category: 'Laptops',
            discountPercentage: 21,
            endsAt: '2024-04-01',
            description: 'Premium Windows experience',
            rating: 4.6,
        },
    ]);
    return (
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="mb-12 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Today's Deals
                    <span className="ml-3 text-sm bg-red-600 text-white px-3 py-1 rounded-full">Limited Time</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Discover exclusive savings on premium tech products - limited quantities available!
                </p>
            </div>

            {/* Featured Deal - Amazon Lightning Deal Style */}
            <motion.div 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-12 shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -2 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Section */}
                    <div className="relative group">
                        <img
                            src={deals[0].image}
                            alt={deals[0].name}
                            className="w-full h-96 object-contain rounded-lg mix-blend-multiply"
                        />
                        <div className="absolute top-2 right-2 flex flex-col gap-2">
                            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                {deals[0].discountPercentage}% off
                            </span>
                            <div className="bg-amazon-blue text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                                <span>Ends in 12h 45m</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-amazon-orange-dark text-sm font-medium">
                                #1 Best Seller
                            </span>
                            <span className="text-gray-500">in {deals[0].category}</span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {deals[0].name}
                        </h2>

                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                ${deals[0].price}
                            </span>
                            <span className="text-gray-500 line-through">
                                List Price: ${deals[0].originalPrice}
                            </span>
                            <span className="text-green-600 text-sm">
                                Save ${deals[0].originalPrice - deals[0].price}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex text-amazon-orange-dark">
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon 
                                        key={i}
                                        icon={faStar}
                                        className={`w-4 h-4 ${i < Math.floor(deals[0].rating) ? 'fill-current' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 dark:text-gray-400">
                                {deals[0].rating.toFixed(1)} out of 5
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <FontAwesomeIcon icon={faBox} />
                                <span>FREE delivery <strong>Tomorrow</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <FontAwesomeIcon icon={faShieldAlt} />
                                <span>2-Year Warranty Included</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button className="bg-amazon-orange hover:bg-amazon-orange-dark text-white px-6 py-3 rounded-lg font-medium flex-1 transition-colors">
                                Add to Cart
                            </button>
                            <button className="border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-medium flex-1 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Deal Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {deals.slice(1).map((deal) => (
                    <motion.div 
                        key={deal.id}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
                        whileHover={{ y: -2 }}
                    >
                        <Link to={`/products/${deal.id}`} className="block mb-4">
                            <div className="relative aspect-square">
                                <img
                                    src={deal.image}
                                    alt={deal.name}
                                    className="w-full h-full object-contain mix-blend-multiply"
                                />
                                <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 rounded-bl-lg text-xs">
                                    -{deal.discountPercentage}%
                                </div>
                            </div>
                        </Link>

                        <div className="space-y-2">
                            <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                                {deal.name}
                            </h3>
                            
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                    ${deal.price}
                                </span>
                                <span className="text-gray-500 line-through text-sm">
                                    ${deal.originalPrice}
                                </span>
                            </div>

                            <div className="flex items-center gap-1">
                                <div className="flex text-amazon-orange-dark">
                                    {[...Array(5)].map((_, i) => (
                                        <FontAwesomeIcon 
                                            key={i}
                                            icon={faStar}
                                            className={`w-3 h-3 ${i < Math.floor(deal.rating) ? 'fill-current' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-500 text-sm">
                                    ({deal.rating.toFixed(1)})
                                </span>
                            </div>

                            <div className="text-sm text-green-600">
                                Save ${deal.originalPrice - deal.price}
                            </div>

                            <button className="w-full bg-amazon-orange hover:bg-amazon-orange-dark text-white py-2 rounded-md text-sm font-medium transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Countdown Banner */}
            <div className="mt-12 bg-amazon-blue text-white p-4 rounded-lg text-center">
                <div className="flex items-center justify-center gap-4">
                    <FontAwesomeIcon icon={faClock} className="w-6 h-6" />
                    <span className="text-lg font-medium">
                        These deals end in {Math.floor(Math.random() * 24)}h {Math.floor(Math.random() * 60)}m!
                    </span>
                </div>
            </div>
        </div>
    );
}
