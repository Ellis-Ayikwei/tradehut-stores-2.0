'use client';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ProductListPriceDisplay from './productListPrice';

interface ProductCardProps {
    readonly id: string;
    readonly name: string;
    readonly price: number;
    readonly image: string;
    readonly category: string;
    readonly brand: string;
    readonly rating?: number;
    readonly stock: number;
    readonly condition: string;
    readonly discountPercentage?: number;
    readonly description?: string;
}

export default function ProductCard({ id, name, price, image, description, category, brand, rating, stock, condition, discountPercentage }: ProductCardProps) {
    const stockStatus = stock < 5 ? 'Low Stock' : stock < 10 ? 'Limited Stock' : 'In Stock';
    const stockColor = stock < 5 ? 'bg-red-500' : stock < 10 ? 'bg-amber-500' : 'bg-green-500';

    return (
        <div className="group relative flex flex-row rounded-lg border bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:flex-col">
            {/* Image Container */}
            <div className="w-2/5 shrink-2 sm:w-full">
                <Link to={`/products/${id}`} className="relative block h-full overflow-hidden">
                    <div className="aspect-square w-full">
                        <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>

                    {/* Stock Badge */}
                    <span className={`absolute right-2 top-2 rounded-full px-2 py-1 text-xs font-medium text-white ${stockColor}`}>{stockStatus}</span>
                </Link>
            </div>

            {/* Product Info */}
            <div className="flex w-3/5 flex-col justify-between p-3 sm:w-full sm:p-4">
                {/* Top Section */}
                <div className="space-y-1">
                    <div className="flex items-start justify-between">
                        {/* <span className="text-xs font-medium text-primary-600 dark:text-primary-400">{category}</span> */}
                        <span className="rounded-full border px-2 py-0.5 text-xs font-medium text-gray-500 dark:border-gray-600 dark:text-gray-400">{condition}</span>
                    </div>

                    <Link to={`/products/${id}`} className="focus:outline-none">
                        <h3 className="text-base font-medium leading-tight text-gray-900 line-clamp-2 hover:text-primary-600 dark:text-white dark:hover:text-primary-400">{name}</h3>
                        <div className="flex mt-0.5  text-sm text-gray-500 dark:text-gray-400">{description}</div>
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{brand}</p>
                    </Link>
                </div>

                {/* Middle Section */}
                <div className="my-2 sm:my-3">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            <ProductListPriceDisplay price={price} discountPercent={discountPercentage} />
                        </span>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`h-4 w-4 ${i < Math.floor(rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{rating ? `${rating.toFixed(1)}` : 'No reviews'}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-[1fr_auto] gap-2 sm:flex sm:gap-3">
                    <button className="flex-1 rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                        Add to Cart
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center rounded-lg border p-2 text-gray-500 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    >
                        <FontAwesomeIcon icon={faHeart} className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
