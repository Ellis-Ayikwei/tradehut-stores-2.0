'use client';

import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import useSwr from 'swr';
import fetcher from '../../helper/fetcher';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMinus from '../Icon/IconMinus';

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

interface SubCategory {
    category: string;
    created_at: string;
    id: string;
    sub_category_name: string;
    updated_at: string;
}

interface Category {
    created_at: string;
    description: string | null;
    id: string;
    name: string;
    updated_at: string;
}

interface filterState {
    search: string;
    priceRange: { min: string; max: string };
    subCategories: SubCategory[];
    sortBy: string;
    inStock: boolean;
}

export default function Sidebar({ onFilterChange, brands, onCategoryChange, onBrandChange, onPriceChange, onConditionChange, onAvailabilityChange }: SidebarProps) {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const conditions = ['New', 'Used - Like New', 'Used - Good', 'Used - Fair', 'Refurbished'];
    const availability = ['In Stock', 'Out of Stock', 'Pre-order'];
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    const handlePriceChange = (value: [number, number]) => {
        setPriceRange(value);
        onPriceChange(value);
    };

    const { data: categories, error: categoriesError } = useSwr('/categories/', fetcher);
    const { data: subCategories, error: subCategoriesError } = useSwr('/sub-categories/', fetcher);
    const { data: brandsData, error: brandsError } = useSwr('/brands/', fetcher);

    const subCategoryList = subCategories ? subCategories.map((subcategory: SubCategory) => ({ name: subcategory.sub_category_name, id: subcategory.id, categoryId: subcategory.category })) : [];
    const categoryList = categories ? categories?.map((category: Category) => ({ name: category.name, id: category.id })) : [];
    const brandList = brandsData ? brandsData?.map((brand: any) => brand.name) : [];

    const [filters, setFilters] = useState<filterState>({
        search: '',
        priceRange: { min: '', max: '' },
        subCategories: [],
        sortBy: 'recommended',
        inStock: false,
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFilters = { ...filters, search: e.target.value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleCategoryToggle = (category: SubCategory) => {
        const newCategories = filters.subCategories.includes(category) ? filters.subCategories.filter((c) => c !== category) : [...filters.subCategories, category];

        const newFilters = { ...filters, subCategories: newCategories };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleStockToggle = () => {
        const newFilters = { ...filters, inStock: !filters.inStock };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="space-y-1">
            {/* Brands */}
            <div>
                <ul className="relative space-y-0.5 p-4 py-0">
                    <button type="button" className={`${currentMenu === 'brands' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('brands')}>
                        <div className="flex items-center uppercase font-extrabold bg-primary-100 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1 justify-between">
                            <h2 className="py-1 px-7 flex items-center uppercase font-extrabold bg-primary-100 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>Brands</span>
                            </h2>
                            <div className={currentMenu !== 'brands' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                <IconCaretDown />
                            </div>
                        </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'brands' ? 'auto' : 0}>
                        <ul className="sub-menu text-gray-500">
                            <ul>
                                {brandList.map((brand: { name: string; id: string }) => (
                                    <li key={brand.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-[#dc711a] focus:ring-[#dc711a]"
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                onBrandChange(isChecked ? [...brands, brand] : brands.filter((b) => b !== brand));
                                            }}
                                        />
                                        <span className="ml-2 text-gray-700 dark:text-gray-300">{brand}</span>
                                    </li>
                                ))}
                            </ul>
                        </ul>
                    </AnimateHeight>
                </ul>
            </div>

            {/* Categories */}
            <div>
                <ul className="relative space-y-0.5 p-4 py-0">
                    <button type="button" className={`${currentMenu === 'categories' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('categories')}>
                        <div className="flex items-center uppercase font-extrabold bg-primary-100 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1 justify-between">
                            <h2 className="py-1 px-7 flex items-center uppercase font-extrabold bg-primary-100 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>Categories</span>
                            </h2>
                            <div className={currentMenu !== 'categories' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                <IconCaretDown />
                            </div>
                        </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'categories' ? 'auto' : 0}>
                        <ul className="sub-menu text-gray-500">
                            <ul>
                                {categoryList.map((category: { name: string; id: string }) => (
                                    <li key={category.id} className="menu nav-item flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-[#dc711a] focus:ring-[#dc711a]"
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                onCategoryChange(isChecked ? [...categories, category.id] : categories.filter((c: Category) => c.id !== category.id));
                                            }}
                                        />
                                        <span className="ml-2 text-gray-700 dark:text-gray-300">{category.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </ul>
                    </AnimateHeight>
                </ul>
            </div>

            {/* Condition */}
            <div>
                <ul className="relative space-y-0.5 p-4 py-0">
                    <button type="button" className={`${currentMenu === 'conditions' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('conditions')}>
                        <div className="flex items-center uppercase font-extrabold bg-primary-100 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1 justify-between">
                            <h2 className="py-1 px-7 flex items-center uppercase font-extrabold bg-primary-100 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>Condition</span>
                            </h2>
                            <div className={currentMenu !== 'conditions' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                <IconCaretDown />
                            </div>
                        </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'conditions' ? 'auto' : 0}>
                        <ul className="sub-menu text-gray-500">
                            <ul>
                                {conditions.map((condition, index) => (
                                    <li key={index} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-[#dc711a] focus:ring-[#dc711a]"
                                            onChange={(e) => {
                                                if (onConditionChange) {
                                                    const isChecked = e.target.checked;
                                                    onConditionChange(isChecked ? [...conditions, condition] : conditions.filter((c) => c !== condition));
                                                }
                                            }}
                                        />
                                        <span className="ml-2 text-gray-700 dark:text-gray-300">{condition}</span>
                                    </li>
                                ))}
                            </ul>
                        </ul>
                    </AnimateHeight>
                </ul>
            </div>

            {/* Availability */}
            <div>
                <ul className="relative space-y-0.5 p-4 py-0">
                    <button type="button" className={`${currentMenu === 'availability' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('availability')}>
                        <div className="flex items-center uppercase font-extrabold bg-primary-100 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1 justify-between">
                            <h2 className="py-1 px-7 flex items-center uppercase font-extrabold bg-primary-100 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>Availability</span>
                            </h2>
                            <div className={currentMenu !== 'availability' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                <IconCaretDown />
                            </div>
                        </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'availability' ? 'auto' : 0}>
                        <ul className="sub-menu text-gray-500">
                            <ul>
                                {availability.map((status) => (
                                    <li key={status} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-[#dc711a] focus:ring-[#dc711a]"
                                            onChange={(e) => {
                                                if (onAvailabilityChange) {
                                                    const isChecked = e.target.checked;
                                                    onAvailabilityChange(isChecked ? [...availability, status] : availability.filter((a) => a !== status));
                                                }
                                            }}
                                        />
                                        <span className="ml-2 text-gray-700 dark:text-gray-300">{status}</span>
                                    </li>
                                ))}
                            </ul>
                        </ul>
                    </AnimateHeight>
                </ul>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Price Range</h3>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <input
                            type="number"
                            min="0"
                            max={priceRange[1]}
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
                            className="w-24 rounded-md border-gray-300 shadow-sm focus:border-[#dc711a] focus:ring-[#dc711a]"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                            type="number"
                            min={priceRange[0]}
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
                            className="w-24 rounded-md border-gray-300 shadow-sm focus:border-[#dc711a] focus:ring-[#dc711a]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
