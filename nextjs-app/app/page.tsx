'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { fetchFeaturedProducts, fetchPopularProducts, fetchNewArrivals } from '@/store/productSlice'
import MainLayout from '@/components/Layouts/MainLayout'
import ProductCard from '@/components/Products/ProductCard'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Carousel, Button } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, TrendingUp, Sparkles, Package } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HomePage() {
    const dispatch = useDispatch<AppDispatch>()
    const { featuredProducts, popularProducts, newArrivals, isUpdating } = useSelector((state: RootState) => state.products)

    useEffect(() => {
        dispatch(fetchFeaturedProducts())
        dispatch(fetchPopularProducts())
        dispatch(fetchNewArrivals())
    }, [dispatch])

    const heroSlides = [
        {
            title: 'Summer Sale',
            subtitle: 'Up to 50% off on selected items',
            image: '/assets/images/hero-1.jpg',
            cta: 'Shop Now',
            link: '/deals',
        },
        {
            title: 'New Arrivals',
            subtitle: 'Discover the latest trends',
            image: '/assets/images/hero-2.jpg',
            cta: 'Explore',
            link: '/products',
        },
        {
            title: 'Premium Quality',
            subtitle: 'Best products, guaranteed satisfaction',
            image: '/assets/images/hero-3.jpg',
            cta: 'Learn More',
            link: '/about',
        },
    ]

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="relative">
                <Carousel autoplay className="h-[500px] md:h-[600px]">
                    {heroSlides.map((slide, index) => (
                        <div key={index} className="relative h-[500px] md:h-[600px]">
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <div className="text-center text-white px-4">
                                    <motion.h1 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-4xl md:text-6xl font-bold mb-4"
                                    >
                                        {slide.title}
                                    </motion.h1>
                                    <motion.p 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-xl md:text-2xl mb-8"
                                    >
                                        {slide.subtitle}
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <Link href={slide.link}>
                                            <Button 
                                                type="primary" 
                                                size="large"
                                                className="bg-primary-500 hover:bg-primary-600 border-0"
                                                icon={<ArrowRight className="h-5 w-5" />}
                                            >
                                                {slide.cta}
                                            </Button>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                            <div className="h-full bg-gray-200">
                                {/* Background image placeholder */}
                            </div>
                        </div>
                    ))}
                </Carousel>
            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-4 py-16">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <TrendingUp className="h-8 w-8 text-primary-500" />
                            Featured Products
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Handpicked items just for you</p>
                    </div>
                    <Link href="/products?filter=featured">
                        <Button type="link" className="text-primary-500 hover:text-primary-600">
                            View All <ArrowRight className="inline h-4 w-4 ml-1" />
                        </Button>
                    </Link>
                </div>
                
                {isUpdating ? (
                    <LoadingSpinner text="Loading featured products..." />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {featuredProducts.slice(0, 8).map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* Popular Products */}
            <section className="bg-gray-50 dark:bg-gray-900 py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Sparkles className="h-8 w-8 text-primary-500" />
                                Popular Products
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Trending items our customers love</p>
                        </div>
                        <Link href="/products?filter=popular">
                            <Button type="link" className="text-primary-500 hover:text-primary-600">
                                View All <ArrowRight className="inline h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </div>
                    
                    {isUpdating ? (
                        <LoadingSpinner text="Loading popular products..." />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {popularProducts.slice(0, 8).map((product: any) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* New Arrivals */}
            <section className="container mx-auto px-4 py-16">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Package className="h-8 w-8 text-primary-500" />
                            New Arrivals
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Fresh products just added</p>
                    </div>
                    <Link href="/products?filter=new">
                        <Button type="link" className="text-primary-500 hover:text-primary-600">
                            View All <ArrowRight className="inline h-4 w-4 ml-1" />
                        </Button>
                    </Link>
                </div>
                
                {isUpdating ? (
                    <LoadingSpinner text="Loading new arrivals..." />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {newArrivals.slice(0, 8).map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* Newsletter Section */}
            <section className="bg-primary-500 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                        Subscribe to our newsletter and get exclusive deals, new product alerts, and special offers delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <Button 
                            size="large" 
                            className="bg-white text-primary-500 hover:bg-gray-100 border-0 font-semibold"
                        >
                            Subscribe
                        </Button>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}