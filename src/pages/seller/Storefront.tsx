'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Mock function to fetch products by seller
const fetchProductsBySeller = (sellerId: string) => {
    // Replace with actual API call
    return products.filter((product) => product.sellerId === sellerId);
};

export default function Storefront() {
    const { sellerId } = useParams<{ sellerId: string }>();
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState<string>('asc');

    useEffect(() => {
        const sellerProducts = fetchProductsBySeller(sellerId);
        setProducts(sellerProducts);
    }, [sellerId]);

    const handleSortChange = (order: string) => {
        setSortOrder(order);
    };

    const sortedProducts = products.sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow-md py-4">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Seller's Storefront</h1>
                    <div className="flex space-x-4">
                        <button onClick={() => handleSortChange(sortOrder === 'asc' ? 'desc' : 'asc')} className="text-gray-700 dark:text-gray-200 hover:text-primary-600">
                            <FontAwesomeIcon icon={faSort} className="mr-2" />
                            Sort by Price
                        </button>
                        <button className="text-gray-700 dark:text-gray-200 hover:text-primary-600">
                            <FontAwesomeIcon icon={faFilter} className="mr-2" />
                            Filter
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {sortedProducts.map((product) => (
                        <div key={product.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-xl" />
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{product.name}</h3>
                                <p className="text-primary-600 font-bold">${product.price}</p>
                                <div className="flex items-center mt-2">
                                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                                    <span className="ml-2 text-gray-600 dark:text-gray-300">4.5 (200 reviews)</span>
                                </div>
                                <Link to={`/product/${product.id}`} className="mt-4 inline-block text-primary-600 hover:text-primary-700">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
