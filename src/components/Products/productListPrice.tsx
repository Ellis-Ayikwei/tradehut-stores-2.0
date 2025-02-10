import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';

interface ProductListPriceDisplayProps {
    price: number;
    discountPercent?: number;
}

const ProductListPriceDisplay = React.memo(({ price, discountPercent }: ProductListPriceDisplayProps) => {
    const hasDiscount = discountPercent != null && discountPercent > 0;
    const { formatPrice } = useCurrency();
    // Calculate the discounted price using the percentage.
    const discountedPrice: number = hasDiscount ? price - (price * (discountPercent as number)) / 100 : price;

    return hasDiscount ? (
        <div className="flex flex-wrap items-center space-x-4">
            {/* Display the discounted price */}
            <span className="text-xl font-bold text-black">{formatPrice(Number(discountedPrice.toFixed(2)))}</span>
            {/* Display the original price struck-through */}
            <span className="text-sm text-gray-500 line-through">{formatPrice(Number(price.toFixed(2)))}</span>
            {/* Display the discount badge */}
            {/* <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">{discountPercent}% OFF</span> */}
        </div>
    ) : (
        <div className="flex items-center space-x-4">
            <span className="text-sm font-bold">{formatPrice(Number(price.toFixed(2)))}</span>
        </div>
    );
});

export default ProductListPriceDisplay;
