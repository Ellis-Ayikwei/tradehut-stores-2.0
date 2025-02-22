import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { ProductDetail } from '../../types';

interface ProductPriceDisplayProps {
    productDetail: ProductDetail;
}

const ProductPriceDisplay = React.memo(({ productDetail }: ProductPriceDisplayProps) => {
    const { price, discount_percentage, final_price } = productDetail;
    const hasDiscount = discount_percentage != null && discount_percentage > 0;
    const { formatPrice } = useCurrency();
    // Calculate the discounted price using the percentage.
    const numericPrice = parseFloat(price);
    const discountedPrice = hasDiscount ? numericPrice - (numericPrice * discount_percentage) / 100 : numericPrice;

    return hasDiscount ? (
        <div className="flex items-center space-x-4">
            {/* Display the discounted price */}
            <span className="text-3xl font-bold text-primary">{formatPrice(Number((final_price ?? discountedPrice).toFixed(2)))}</span>
            {/* Display the original price struck-through */}
            <span className="text-gray-500 line-through">{formatPrice(Number(parseFloat(price).toFixed(2)))}</span>
            {/* Display the discount badge */}
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">{discount_percentage}% OFF</span>
        </div>
    ) : (
        <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-primary">{formatPrice(Number(parseFloat(price).toFixed(2)))}</span>
        </div>
    );
});

export default ProductPriceDisplay;
