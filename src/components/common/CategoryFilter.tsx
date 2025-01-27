import React from 'react';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
        <div className="mb-8">
            <div className="flex flex-wrap gap-4">
                {categories.map((category) => (
                    <motion.button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedCategory === category ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
