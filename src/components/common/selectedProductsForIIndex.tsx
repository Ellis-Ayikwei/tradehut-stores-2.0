import { faArrowRight, faBolt, faFire, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Product } from '../../types';
import ProductCard from '../Products/ProductCard';

type Props = {
    products: Product[];
    sectionTitle: string;
    productLimit: number;
    variant?: 'default' | 'carousel' | 'grid';
    theme?: 'light' | 'dark' | 'gradient';
};

const SelectedProductsSection = ({ products, sectionTitle, productLimit, variant = 'grid', theme = 'light' }: Props) => {
    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Lazy load products with intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleProducts(products.slice(0, productLimit));
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [products, productLimit]);

    const getThemeClasses = () => {
        switch (theme) {
            case 'dark':
                return 'bg-gray-900 text-white';
            case 'gradient':
                return 'bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 text-white';
            default:
                return 'bg-white dark:bg-gray-900';
        }
    };

    const renderSectionIcon = () => {
        switch (sectionTitle.toLowerCase()) {
            case 'new arrivals':
                return <FontAwesomeIcon icon={faBolt} className="text-purple-500 ml-3" />;
            case 'best sellers':
                return <FontAwesomeIcon icon={faFire} className="text-red-500 ml-3" />;
            case 'trending products':
                return <FontAwesomeIcon icon={faStar} className="text-yellow-400 ml-3" />;
            default:
                return null;
        }
    };

    return (
        <section className={`relative py-20 ${getThemeClasses()} overflow-hidden`} ref={containerRef}>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                {/* Section Header with Decorative Elements */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-14 space-y-6 md:space-y-0">
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary-600 to-red-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                        <h2 className="relative text-4xl font-bold text-gray-900 dark:text-white flex items-center">
                            {sectionTitle}
                            {renderSectionIcon()}
                        </h2>
                        <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-primary-200 to-red-600 mt-2"></div>
                    </div>

                    <button className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition-all bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700">
                        <span className="relative">View All Products</span>
                        <FontAwesomeIcon icon={faArrowRight} className="ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>

                {/* Dynamic Content Area */}
                {variant === 'carousel' ? (
                    <div className="relative overflow-hidden group">
                        <div className="flex snap-x snap-mandatory gap-8 pb-8 overflow-x-auto scrollbar-hide">
                            {visibleProducts.map((product, index) => (
                                <div key={product.id} className="snap-center flex-shrink-0 w-72 transform transition-all duration-500 hover:scale-105" style={{ opacity: 1 - index * 0.1 }}>
                                    <ProductCard
                                        {...product}
                                        price={parseFloat(product.price)}
                                        discountPercentage={product.discount_percentage}
                                        image={product.main_product_image?.url || product.image}
                                        stock={product.inventory_level}
                                        className="relative bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl rounded-2xl overflow-hidden"
                                        badge={index < 3 ? `#${index + 1} Best Seller` : undefined}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10">
                        {visibleProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                {...product}
                                price={parseFloat(product.price)}
                                discountPercentage={product.discount_percentage}
                                image={product.main_product_image?.url || product.image}
                                stock={product.inventory_level}
                                className="relative group bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2"
                                imageClassName="group-hover:scale-110 transition-transform duration-300"
                                quickViewButton
                                wishlistButton
                                ratingDisplay
                                hoverEffects
                            />
                        ))}
                    </div>
                )}

                {/* Animated Background Elements */}
                {theme === 'gradient' && (
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
                    </div>
                )}
            </div>

            {/* Mobile Optimization */}
            {isMobile && variant !== 'carousel' && (
                <div className="sm:hidden -mx-4 overflow-x-auto pb-8 scroll-smooth snap-x">
                    <div className="flex px-4 space-x-6">
                        {visibleProducts.map((product) => (
                            <div key={product.id} className="w-80 flex-shrink-0 snap-center transform transition-all duration-300 hover:scale-95">
                                <ProductCard
                                    {...product}
                                    price={parseFloat(product.price)}
                                    discountPercentage={product.discount_percentage}
                                    image={product.main_product_image?.url || product.image}
                                    stock={product.inventory_level}
                                    compactView
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default SelectedProductsSection;
