'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { Card, Rate, Button, Tooltip } from 'antd'
import { useCurrency } from '@/contexts/CurrencyContext'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { addToCart } from '@/store/cartSlice'
import { addToWishlist } from '@/store/wishListSlice'
import { motion } from 'framer-motion'

interface ProductCardProps {
    product: {
        id: string
        name: string
        price: string | number
        final_price: number
        main_product_image: string
        average_rating: string | number
        total_reviews: number
        discount_percentage?: number
        category?: string
        brand?: string
    }
}

export default function ProductCard({ product }: ProductCardProps) {
    const { formatCurrency, convert } = useCurrency()
    const dispatch = useDispatch<AppDispatch>()

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        // Add to cart logic
    }

    const handleAddToWishlist = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        // Add to wishlist logic
    }

    const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price
    const rating = typeof product.average_rating === 'string' ? parseFloat(product.average_rating) : product.average_rating

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <Card
                hoverable
                className="h-full overflow-hidden border-0 shadow-lg"
                cover={
                    <div className="relative group">
                        <Link href={`/products/${product.id}`}>
                            <div className="relative h-64 overflow-hidden bg-gray-100">
                                {product.main_product_image ? (
                                    <Image
                                        src={product.main_product_image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gray-200">
                                        <span className="text-gray-400">No image</span>
                                    </div>
                                )}
                                
                                {/* Discount Badge */}
                                {product.discount_percentage && product.discount_percentage > 0 && (
                                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                                        -{product.discount_percentage}%
                                    </div>
                                )}

                                {/* Quick Action Buttons */}
                                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                                    <Tooltip title="Quick View">
                                        <Button
                                            shape="circle"
                                            icon={<Eye className="h-4 w-4" />}
                                            className="bg-white hover:bg-primary-500 hover:text-white"
                                        />
                                    </Tooltip>
                                    <Tooltip title="Add to Wishlist">
                                        <Button
                                            shape="circle"
                                            icon={<Heart className="h-4 w-4" />}
                                            className="bg-white hover:bg-primary-500 hover:text-white"
                                            onClick={handleAddToWishlist}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Add to Cart">
                                        <Button
                                            shape="circle"
                                            icon={<ShoppingCart className="h-4 w-4" />}
                                            className="bg-white hover:bg-primary-500 hover:text-white"
                                            onClick={handleAddToCart}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        </Link>
                    </div>
                }
            >
                <div className="space-y-2">
                    {/* Category & Brand */}
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>{product.category}</span>
                        <span>{product.brand}</span>
                    </div>

                    {/* Product Name */}
                    <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-500 line-clamp-2">
                            {product.name}
                        </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                        <Rate disabled defaultValue={rating} className="text-sm" />
                        <span className="text-xs text-gray-500">({product.total_reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                        <div>
                            {product.discount_percentage && product.discount_percentage > 0 ? (
                                <>
                                    <span className="text-lg font-bold text-primary-500">
                                        {formatCurrency(product.final_price)}
                                    </span>
                                    <span className="ml-2 text-sm text-gray-500 line-through">
                                        {formatCurrency(price)}
                                    </span>
                                </>
                            ) : (
                                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    {formatCurrency(price)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        type="primary"
                        block
                        icon={<ShoppingCart className="h-4 w-4" />}
                        className="bg-primary-500 hover:bg-primary-600"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </div>
            </Card>
        </motion.div>
    )
}