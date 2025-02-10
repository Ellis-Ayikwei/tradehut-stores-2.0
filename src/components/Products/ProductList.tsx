'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: Product[];
    selectedCategories: string[];
    selectedBrands: string[];
    priceRange: [number, number];
}

export default function ProductList({ products, selectedCategories, selectedBrands, priceRange }: ProductListProps) {
    const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc');

    console.log('products from ProductList', products);
    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const matchesPrice = parseFloat(product.price) >= priceRange[0] && parseFloat(product.price) <= priceRange[1];

        return matchesCategory && matchesBrand && matchesPrice;
    });

    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return parseFloat(a.price) - parseFloat(b.price);
            case 'price-desc':
                return parseFloat(b.price) - parseFloat(a.price);
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    return (
        <div>
            <div className="mb-6 flex justify-between items-center border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-semibold">Products ({products.length})</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Sort by:</span>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="border rounded-md px-3 py-1 text-sm hover:bg-gray-100">
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="name">Name</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        {...product}
                        price={Number(parseFloat(product.price))}
                        discountPercentage={product.discount_percentage}
                        image={product.main_product_image?.url}
                        stock={product.inventory_level}
                    />
                ))}
            </div>

            {/* {filteredProducts.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-500">No products match your filters</p>
                </div>
            )} */}
        </div>
    );
}
