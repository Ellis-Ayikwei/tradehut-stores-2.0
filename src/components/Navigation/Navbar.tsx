'use client';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-gray-800 shadow-md transition-colors">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src="/assets/images/tradehut3.png" alt="TradeHut" className="h-8 dark:invert" />
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-[#dc711a]">
                            Products
                        </Link>
                        <Link to="/deals" className="text-gray-700 dark:text-gray-200 hover:text-[#dc711a]">
                            Deals
                        </Link>
                        <Link to="/sell" className="text-gray-700 dark:text-gray-200 hover:text-[#dc711a]">
                            Sell
                        </Link>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-white hover:text-gray-300 transition-colors">
                            <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
                        </button>
                        <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-200 hover:text-[#dc711a]">
                            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="h-5 w-5" />
                        </button>
                        <Link to="/wishlist" className="text-gray-700 dark:text-gray-200 hover:text-[#dc711a]">
                            <FontAwesomeIcon icon={faHeart} className="h-5 w-5" />
                        </Link>
                        <Link to="/cart" className="text-gray-700 dark:text-gray-200 hover:text-[#dc711a] relative">
                            <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
                            <span className="absolute -top-2 -right-2 bg-[#dc711a] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
                        </Link>
                        <Menu as="div" className="relative">
                            <Menu.Button className="flex items-center text-gray-700 dark:text-gray-200 hover:text-[#dc711a] dark:hover:text-[#dc711a]">
                                <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link to="/profile/settings" className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                                                Settings
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link to="/profile/orders" className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                                                Orders
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => {
                                                    /* Add logout handler */
                                                }}
                                                className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                                            >
                                                Sign out
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Menu>
                    </div>

                    {/* Search Bar */}
                </div>
            </div>
            <motion.div initial={false} animate={{ height: isSearchOpen ? 'auto' : 0, opacity: isSearchOpen ? 1 : 0 }} className="overflow-hidden">
                <div className="py-4 w-[70%] px-20 mx-auto justify-center items-center text-center">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </motion.div>
        </nav>
    );
}
