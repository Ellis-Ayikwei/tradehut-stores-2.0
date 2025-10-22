'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { 
    Search, 
    ShoppingCart, 
    Heart, 
    User, 
    Menu, 
    X,
    Sun,
    Moon,
    Globe
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useCurrency } from '@/contexts/CurrencyContext'
import { Badge } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const { theme, toggleTheme } = useTheme()
    const { currency, setCurrency } = useCurrency()
    const cart = useSelector((state: RootState) => state.cart.cart)
    const wishlist = useSelector((state: RootState) => state.wishlist.wishlist)

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
        { href: '/deals', label: 'Deals' },
        { href: '/sell', label: 'Sell' },
    ]

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary-500">E-Shop</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-gray-700 dark:text-gray-200 hover:text-primary-500 transition-colors ${
                                    pathname === link.href ? 'text-primary-500 font-semibold' : ''
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {theme === 'dark' ? (
                                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                            ) : (
                                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                            )}
                        </button>

                        {/* Currency Selector */}
                        <div className="relative hidden md:block">
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="appearance-none bg-transparent text-gray-700 dark:text-gray-200 pr-8 pl-2 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="JPY">JPY</option>
                            </select>
                            <Globe className="absolute right-2 top-2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Wishlist */}
                        <Link href="/wishlist" className="relative p-2">
                            <Badge count={wishlist.item_count} size="small">
                                <Heart className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                            </Badge>
                        </Link>

                        {/* Cart */}
                        <Link href="/cart" className="relative p-2">
                            <Badge count={cart.item_count} size="small">
                                <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                            </Badge>
                        </Link>

                        {/* User Account */}
                        <Link href="/profile" className="p-2">
                            <User className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                            ) : (
                                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                                    pathname === link.href ? 'bg-primary-50 dark:bg-primary-900 text-primary-500' : ''
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        
                        {/* Mobile Search */}
                        <div className="px-4 py-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}