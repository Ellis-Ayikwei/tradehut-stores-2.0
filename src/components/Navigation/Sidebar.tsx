'use client';

import { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import useSwr from 'swr';
import fetcher from '../../helper/fetcher';
import IconCaretDown from '../Icon/IconCaretDown';

interface SidebarProps {
    categories: string[];
    subCategories: string[];
    brands: string[];
    onFilterChange: (filters: any) => void;
    onCategoryChange: (categories: string[]) => void;
    onBrandChange: (brands: string[]) => void;
    onPriceChange: (range: [number, number]) => void;
    onConditionChange?: (conditions: string[]) => void;
    onAvailabilityChange?: (availability: string[]) => void;
}

export default function Sidebar({ onFilterChange, brands, onCategoryChange, onBrandChange, onPriceChange, onConditionChange, onAvailabilityChange }: SidebarProps) {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const conditions = ['New', 'Used - Like New', 'Used - Good', 'Used - Fair', 'Refurbished'];
    const availability = ['In Stock', 'Out of Stock', 'Pre-order'];
    const [currentMenu, setCurrentMenu] = useState<string>('');

    const { data: categories } = useSwr('/categories/', fetcher);
    const { data: subCategories } = useSwr('/sub-categories/', fetcher);
    const { data: brandsData } = useSwr('/brands/', fetcher);

    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => (oldValue === value ? '' : value));
    };

    const handlePriceChange = (value: [number, number]) => {
        setPriceRange(value);
        onPriceChange(value);
    };

    return (
        <div className="w-64 pr-4 bg-white">
            {/* Price Filter */}
            <div className="pb-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3.5 mt-1">Price</h3>
                <div className="flex items-center gap-1.5">
                    <div className="relative flex-1">
                        <span className="absolute left-2.5 top-2 text-xs text-gray-600">$</span>
                        <input
                            type="number"
                            min="0"
                            max={priceRange[1]}
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
                            className="w-full pl-7 pr-2 py-1.5 text-xs border border-gray-400 rounded-sm focus:ring-1 focus:ring-[#dc711a] focus:border-[#dc711a] outline-none"
                        />
                    </div>
                    <span className="text-xs text-gray-500">to</span>
                    <div className="relative flex-1">
                        <span className="absolute left-2.5 top-2 text-xs text-gray-600">$</span>
                        <input
                            type="number"
                            min={priceRange[0]}
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
                            className="w-full pl-7 pr-2 py-1.5 text-xs border border-gray-400 rounded-sm focus:ring-1 focus:ring-[#dc711a] focus:border-[#dc711a] outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Departments (Categories) */}
            <div className="pb-3 border-b border-gray-200">
                <button onClick={() => toggleMenu('categories')} className="flex justify-between items-center w-full py-2.5 group">
                    <h3 className="text-sm font-semibold text-gray-900">Department</h3>
                    <IconCaretDown className={`w-3.5 h-3.5 text-gray-600 transition-transform ${currentMenu === 'categories' ? 'rotate-180' : ''}`} />
                </button>
                <AnimateHeight duration={200} height={currentMenu === 'categories' ? 'auto' : 0}>
                    <div className="mt-1 space-y-2.5 pb-2">
                        {categories?.map((category: any) => (
                            <label key={category.id} className="flex items-center gap-2.5 px-0.5 py-1 hover:bg-gray-50 rounded-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-3.5 w-3.5 border-gray-400 rounded-sm text-[#dc711a] focus:ring-1 focus:ring-[#dc711a] focus:ring-offset-0"
                                    onChange={(e) => onCategoryChange(e.target.checked ? [...categories, category.id] : categories.filter((c: any) => c.id !== category.id))}
                                />
                                <span className="text-xs text-gray-700 font-medium tracking-wide">{category.name}</span>
                            </label>
                        ))}
                    </div>
                </AnimateHeight>
            </div>

            {/* Brands */}
            <div className="pb-3 border-b border-gray-200">
                <button onClick={() => toggleMenu('brands')} className="flex justify-between items-center w-full py-2.5 group">
                    <h3 className="text-sm font-semibold text-gray-900">Brand</h3>
                    <IconCaretDown className={`w-3.5 h-3.5 text-gray-600 transition-transform ${currentMenu === 'brands' ? 'rotate-180' : ''}`} />
                </button>
                <AnimateHeight duration={200} height={currentMenu === 'brands' ? 'auto' : 0}>
                    <div className="mt-1 space-y-2.5 pb-2">
                        {brandsData?.map((brand: any) => (
                            <label key={brand.id} className="flex items-center gap-2.5 px-0.5 py-1 hover:bg-gray-50 rounded-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-3.5 w-3.5 border-gray-400 rounded-sm text-[#dc711a] focus:ring-1 focus:ring-[#dc711a] focus:ring-offset-0"
                                    onChange={(e) => onBrandChange(e.target.checked ? [...brands, brand.id] : brands.filter((b) => b !== brand.id))}
                                />
                                <span className="text-xs text-gray-700 font-medium tracking-wide">{brand.name}</span>
                            </label>
                        ))}
                    </div>
                </AnimateHeight>
            </div>

            {/* Condition */}
            <div className="pb-3 border-b border-gray-200">
                <button onClick={() => toggleMenu('conditions')} className="flex justify-between items-center w-full py-2.5 group">
                    <h3 className="text-sm font-semibold text-gray-900">Item Condition</h3>
                    <IconCaretDown className={`w-3.5 h-3.5 text-gray-600 transition-transform ${currentMenu === 'conditions' ? 'rotate-180' : ''}`} />
                </button>
                <AnimateHeight duration={200} height={currentMenu === 'conditions' ? 'auto' : 0}>
                    <div className="mt-1 space-y-2.5 pb-2">
                        {conditions.map((condition) => (
                            <label key={condition} className="flex items-center gap-2.5 px-0.5 py-1 hover:bg-gray-50 rounded-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-3.5 w-3.5 border-gray-400 rounded-sm text-[#dc711a] focus:ring-1 focus:ring-[#dc711a] focus:ring-offset-0"
                                    onChange={(e) => onConditionChange?.(e.target.checked ? [...conditions, condition] : conditions.filter((c) => c !== condition))}
                                />
                                <span className="text-xs text-gray-700 font-medium tracking-wide">{condition}</span>
                            </label>
                        ))}
                    </div>
                </AnimateHeight>
            </div>

            {/* Availability */}
            <div className="pb-3 border-b border-gray-200">
                <button onClick={() => toggleMenu('availability')} className="flex justify-between items-center w-full py-2.5 group">
                    <h3 className="text-sm font-semibold text-gray-900">Availability</h3>
                    <IconCaretDown className={`w-3.5 h-3.5 text-gray-600 transition-transform ${currentMenu === 'availability' ? 'rotate-180' : ''}`} />
                </button>
                <AnimateHeight duration={200} height={currentMenu === 'availability' ? 'auto' : 0}>
                    <div className="mt-1 space-y-2.5 pb-2">
                        {availability.map((status) => (
                            <label key={status} className="flex items-center gap-2.5 px-0.5 py-1 hover:bg-gray-50 rounded-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-3.5 w-3.5 border-gray-400 rounded-sm text-[#dc711a] focus:ring-1 focus:ring-[#dc711a] focus:ring-offset-0"
                                    onChange={(e) => onAvailabilityChange?.(e.target.checked ? [...availability, status] : availability.filter((a) => a !== status))}
                                />
                                <span className="text-xs text-gray-700 font-medium tracking-wide">{status}</span>
                            </label>
                        ))}
                    </div>
                </AnimateHeight>
            </div>
        </div>
    );
}
