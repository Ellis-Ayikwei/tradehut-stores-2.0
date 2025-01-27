'use client';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    brand: string;
    rating?: number;
    stock: number;
    condition: string;
}

export default function ProductCard({ id, name, price, image, category, brand, rating, stock, condition }: ProductCardProps) {
    const stockLevel = (stock: number) => {
        const gradientLeft = 'bg-gradient-to-l';
        const gradientRight = 'bg-gradient-to-r';
        const gradientCenter = 'bg-gradient-to-t';
        if (stock < 5) {
            return `${gradientLeft} from-red-600 ${gradientCenter} via-red-500 ${gradientRight} to-red-400`;
        } else if (stock < 10) {
            return `${gradientLeft} from-yellow-600 ${gradientCenter} via-yellow-500 ${gradientRight} to-yellow-400`;
        } else {
            return `${gradientLeft} from-green-600 ${gradientCenter} via-green-500 ${gradientRight} to-green-400`;
        }
    };

    return (
        <div key={id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="relative">
                <Link to={`/products/${id}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img src={image} alt={name} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    <div className={`absolute top-2 right-2 text-white px-3 py-1 rounded-full text-xs font-semibold  group-hover:hidden  ${stockLevel(stock)} shadow-lg opacity-70`}>
                        {' '}
                        {stock} in stock
                    </div>
                    <div className="absolute bottom-2 left-2 text-white px-3 py-1 rounded-full text-xs font-semibold  group-hover:flex hidden bg-gradient-to-tr from-gray-900 to-white-dark ">
                        {brand}
                    </div>
                </Link>
            </div>
            <div className="p-6">
                <div className="mb-2">
                    <div className="flex  justify-between items-center">
                        <p className="text-xs text-gray-500">{category}</p>
                        <div className=" text-primary  border border-primary px-2 py-0 rounded-full text-xs italic  bg-primary-50 ">{condition}</div>
                    </div>{' '}
                    <h3 className="font-semibold text-lg dark:text-white break-words flex-wrap flex">{name}</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-0">
                    <span className="text-2xl font-bold text-primary-500">${price}</span>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={rating && i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-primary-500 text-white py-3 rounded-full font-semibold hover:bg-primary-600 transition-colors flex-1">Add to Cart</button>
                        <button className="text-gray-400 hover:text-red-500 transition-colors border border-gray-200 rounded-full p-3 my-auto hover:bg-red-50 flex justify-center items-center">
                            <FontAwesomeIcon icon={faHeart} className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
