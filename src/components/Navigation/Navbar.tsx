'use client';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Bell, Heart, ShoppingCart, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { getCart } from '../../store/cartSlice';
import { AppDispatch, IRootState } from '../../store/index';
import { getWishlist } from '../../store/wishListSlice';
import CurrencySelector from '../common/CurrencySelector';
import OrderForMeModal from '../common/OrderForMeModal';

export default function Navbar() {
    const dispatch = useDispatch<AppDispatch>();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isOrderForMeOpen, setIsOrderForMeOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);

    const { cart, isUpdating: cartLoading } = useSelector((state: IRootState) => state.cart);
    const { wishlist, isUpdating: wishlistLoading } = useSelector((state: IRootState) => state.wishlist);

    useEffect(() => {
        dispatch(getCart());
        dispatch(getWishlist());
    }, [dispatch]);

    useEffect(() => {
        if (cart && !cartLoading) {
            setCartCount(cart?.item_count);
        }
        if (wishlist && !wishlistLoading) {
            setWishlistCount(wishlist?.item_count);
        }
    }, [cart, wishlist]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-10 transition-all duration-300 bg-white dark:bg-gray-800 shadow-md transition-colors">
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
                        <button onClick={() => setIsOrderForMeOpen(!isOrderForMeOpen)} className="text-gray-700 dark:text-gray-200 hover:text-[#dc711a]">
                            Order For Me
                        </button>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-4">
                        <div className="relative hidden lg:block">
                            <CurrencySelector />
                        </div>
                        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-700 dark:text-white hover:text-[#dc711a] transition-colors">
                            <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
                        </button>
                        <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-200 hover:text-[#dc711a]">
                            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="h-5 w-5" />
                        </button>

                        <Menu as="div" className="relative lg:block">
                            <Menu.Button className="flex items-center text-gray-700 dark:text-gray-200 hover:text-[#dc711a] dark:hover:text-[#dc711a]">
                                <Bell />
                                <span className="absolute -top-2 -right-2 bg-[#dc711a] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{wishlistCount}</span>
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
                        <Link to="/wishlist" className="hidden lg:block text-gray-700 dark:text-gray-200 hover:text-[#655b53] relative">
                            <Heart />
                            <span className="absolute -top-2 -right-2 bg-[#dc711a] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{wishlistCount}</span>
                        </Link>
                        <Link to="/cart" className="hidden lg:block text-gray-700 dark:text-gray-200 hover:text-[#655b53] relative">
                            <ShoppingCart /> <span className="absolute -top-2 -right-2 bg-[#dc711a] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>
                        </Link>
                        <Menu as="div" className="relative lg:block">
                            <Menu.Button className="flex items-center text-gray-700 dark:text-gray-200 hover:text-[#dc711a] dark:hover:text-[#dc711a]">
                                <User />
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
                </div>
            </div>
            <motion.div initial={false} animate={{ height: isSearchOpen ? 'auto' : 0, opacity: isSearchOpen ? 1 : 0 }} className="overflow-hidden">
                <div className="py-4 w-[70%] px-20 mx-auto justify-center items-center text-center">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full bg-white/10 border border-primary-200 rounded-full px-6 py-3 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 bg-primary-50"
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 hover:text-[#dc711a]" />
                    </div>
                </div>
            </motion.div>

            {/* Subnav for Categories and Brands */}
            <div className="bg-gray-100 dark:bg-gray-700 py-2">
                <div className="max-w-screen-xl mx-auto px-4 overflow-x-auto no-scrollbar">
                    <div className="flex space-x-4">
                        {/* Example categories and brands */}
                        <Link to="/category/phones" className="text-gray-700 dark:text-gray-200 hover:text-[#dc711a] whitespace-nowrap">
                            Smartphones
                        </Link>
                        <Link to="/category/laptops" className="text-gray-700 dark:text-gray-200 hover:text-[#dc711a] whitespace-nowrap">
                            Laptops
                        </Link>
                        <Link to="/category/accessories" className="text-gray-700 dark:text-gray-200 hover:text-[#dc711a] whitespace-nowrap">
                            Accessories
                        </Link>
                        <Link to="/brand/apple" className="text-gray-700 dark:text-gray-200 hover:text-[#dc711a] whitespace-nowrap">
                            Apple
                        </Link>
                        <Link to="/brand/samsung" className="text-gray-700 dark:text-gray-200 hover:text-[#dc711a] whitespace-nowrap">
                            Samsung
                        </Link>
                        <Link to="/brand/sony" className="text-gray-700 dark:text-gray-200 hover:text-[#dc711a] whitespace-nowrap">
                            Sony
                        </Link>
                        {/* Add more categories and brands as needed */}
                    </div>
                </div>
            </div>

            <OrderForMeModal isOpen={isOrderForMeOpen} onClose={() => setIsOrderForMeOpen(false)} />
        </nav>
    );
}
