'use client';

import { BarChart3, Box, Edit2, Package, Plus, Settings, ShoppingCart, Star, Trash2, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Types
interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    status: 'active' | 'draft';
    discount: number;
    image: string;
}

interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
    badge?: number;
}

interface DashboardCard {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    trend?: number;
    className?: string;
}

// Components
const DashboardMetricCard = ({ title, value, icon: Icon, trend, className = '' }: DashboardCard) => (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
        <div className="flex items-start justify-between">
            <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-semibold dark:text-white">{value}</p>
            </div>
            <div className="p-2 bg-orange-50 dark:bg-gray-700 rounded-lg">
                <Icon className="w-5 h-5 text-[#dc711a]" />
            </div>
        </div>
        {trend !== undefined && (
            <div className="mt-4 flex items-center">
                <TrendingUp className={`w-4 h-4 ${trend >= 0 ? 'text-green-500' : 'text-red-500'} mr-1`} />
                <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trend > 0 ? '+' : ''}
                    {trend}%
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
            </div>
        )}
    </div>
);

const ProductTable = ({ products, onDelete }: { products: Product[]; onDelete: (id: string) => void }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                                        <Package className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{product.category}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">${product.price.toFixed(2)}</div>
                                {product.discount > 0 && <div className="text-xs text-red-500">-{product.discount}% off</div>}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">{product.stock}</div>
                                {product.stock < 10 && <div className="text-xs text-amber-500">Low stock</div>}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${product.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'}`}
                                >
                                    {product.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                    <Link to={`/products/${product.id}`} className="text-gray-500 hover:text-[#dc711a] transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </Link>
                                    <button onClick={() => onDelete(product.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const Navigation = ({
    activeTab,
    setActiveTab,
    isMobile,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
}: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isMobile: boolean;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
}) => {
    const navItems: NavItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'products', label: 'Products', icon: Package, badge: 3 },
        { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: 5 },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    // if (isMobile) {
    //     return (
    //         <>
    //             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
    //                 {isMobileMenuOpen ? <X className="w-6 h-6 text-[#dc711a]" /> : <Menu className="w-6 h-6 text-[#dc711a]" />}
    //             </button>

    //             <div
    //                 className={`
    //       fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
    //       ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    //     `}
    //             >
    //                 <div
    //                     className={`
    //         fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 shadow-xl
    //         transform transition-transform duration-300 ease-in-out
    //         ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
    //       `}
    //                 >
    //                     <div className="flex flex-col p-4 space-y-2">
    //                         {navItems.map((item) => (
    //                             <button
    //                                 key={item.id}
    //                                 onClick={() => {
    //                                     setActiveTab(item.id);
    //                                     setIsMobileMenuOpen(false);
    //                                 }}
    //                                 className={`
    //                 relative flex items-center space-x-3 px-4 py-3 rounded-lg
    //                 transition-all duration-200 w-full text-left
    //                 ${activeTab === item.id ? 'bg-orange-50 dark:bg-gray-700 text-[#dc711a]' : 'text-gray-600 dark:text-gray-300 hover:bg-orange-50/50 dark:hover:bg-gray-700/50'}
    //               `}
    //                             >
    //                                 <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'scale-110' : ''} transition-transform duration-200`} />
    //                                 <span className="font-medium">{item.label}</span>
    //                                 {item.badge && (
    //                                     <span className="absolute right-4 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full dark:bg-red-900/20 dark:text-red-400">{item.badge}</span>
    //                                 )}
    //                             </button>
    //                         ))}
    //                     </div>
    //                 </div>
    //             </div>
    //         </>
    //     );
    // }

    return (
        <nav className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8 sticky top-4 z-30 items-center justify-center">
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-1 md:space-x-2 mx-auto w-full justify-between">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`
                relative flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg
                transition-all duration-200 group
                ${activeTab === item.id ? 'text-[#dc711a] bg-orange-50 dark:bg-gray-700' : 'text-gray-600 hover:text-[#dc711a] hover:bg-orange-50/50 dark:text-gray-300 dark:hover:bg-gray-700/50'}
              `}
                        >
                            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'scale-110' : ''} transition-transform duration-200`} />
                            <span className="font-medium hidden md:block">{item.label}</span>
                            {item.badge && (
                                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full dark:bg-red-900/20 dark:text-red-400">
                                    {item.badge}
                                </span>
                            )}
                            {/* Tooltip for mobile */}
                            <span
                                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs
                bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                pointer-events-none md:hidden whitespace-nowrap"
                            >
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default function SellerDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [products, setProducts] = useState<Product[]>([
        {
            id: '1',
            name: 'iPhone 13 Pro',
            price: 999,
            stock: 50,
            category: 'Phones',
            status: 'active',
            discount: 10,
            image: '',
        },
        // Add more products as needed
    ]);

    useEffect(() => {
        const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const handleDeleteProduct = (id: string) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const stats: DashboardCard[] = [
        { title: 'Total Sales', value: '$15,000', icon: TrendingUp, trend: 12.5 },
        { title: 'Total Orders', value: '150', icon: ShoppingCart, trend: 8.2 },
        { title: 'Average Rating', value: '4.8', icon: Star, trend: 2.1 },
        { title: 'Active Listings', value: products.length, icon: Box, trend: -4.3 },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat, index) => (
                                <DashboardMetricCard key={index} {...stat} />
                            ))}
                        </div>
                        {/* Add more dashboard content here */}
                    </div>
                );
            case 'products':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold dark:text-white">Products</h2>
                            <button className="bg-[#dc711a] hover:bg-[#dc711a]/90 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                                <Plus className="w-5 h-5" />
                                <span>Add Product</span>
                            </button>
                        </div>
                        <ProductTable products={products} onDelete={handleDeleteProduct} />
                    </div>
                );
            case 'orders':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold dark:text-white">Orders</h2>
                            <div className="flex items-center space-x-4">
                                <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm">
                                    <option value="all">All Orders</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <input type="date" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm" />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                            {/* Orders table would go here */}
                            <div className="p-8 text-center text-gray-500 dark:text-gray-400">Orders component would be rendered here</div>
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold dark:text-white">Settings</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Existing Store Details Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">{/* ... existing store details content ... */}</div>

                            {/* Payment Methods Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
                                <h3 className="text-lg font-semibold dark:text-white">Payment Methods</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div>
                                            <p className="font-medium dark:text-white">Bank Account</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">**** 1234</p>
                                        </div>
                                        <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 cursor-pointer" />
                                    </div>
                                    <button className="w-full flex items-center justify-center space-x-2 text-[#dc711a] hover:text-[#dc711a]/90">
                                        <Plus className="w-5 h-5" />
                                        <span>Add Payment Method</span>
                                    </button>
                                </div>
                            </div>

                            {/* Shipping Configuration Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
                                <h3 className="text-lg font-semibold dark:text-white">Shipping Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shipping Regions</label>
                                        <select className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2">
                                            <option value="us">United States</option>
                                            <option value="eu">European Union</option>
                                            <option value="worldwide">Worldwide</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Standard Shipping Rate</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                            <input
                                                type="number"
                                                className="w-full pl-8 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Free Shipping Threshold</span>
                                        <input type="number" className="w-24 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2" placeholder="$50" />
                                    </div>
                                </div>
                            </div>

                            {/* Tax Configuration Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
                                <h3 className="text-lg font-semibold dark:text-white">Tax Configuration</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tax Rate</label>
                                        <div className="relative">
                                            <input type="number" className="w-full pr-8 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2" placeholder="0.0" />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Tax Inclusive Pricing</span>
                                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700">
                                            <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                        </button>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tax Registration Number</label>
                                        <input type="text" className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2" placeholder="VAT/GSTIN" />
                                    </div>
                                </div>
                            </div>

                            {/* Store Policies Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4 md:col-span-2">
                                <h3 className="text-lg font-semibold dark:text-white">Store Policies</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Return Policy</label>
                                        <textarea
                                            className="w-full h-32 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2"
                                            placeholder="Describe your return policy"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Privacy Policy</label>
                                        <textarea
                                            className="w-full h-32 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2"
                                            placeholder="Describe your privacy policy"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Terms of Service</label>
                                        <textarea
                                            className="w-full h-32 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2"
                                            placeholder="Describe your terms of service"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Existing Preferences and Security Cards */}
                            {/* ... */}

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
                                <h3 className="text-lg font-semibold dark:text-white">Store Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Store Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2"
                                            placeholder="Your Store Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Store Description</label>
                                        <textarea
                                            className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2"
                                            rows={3}
                                            placeholder="Describe your store"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
                                <h3 className="text-lg font-semibold dark:text-white">Preferences</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Email Notifications</span>
                                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700">
                                            <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-[#dc711a] transition" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
                                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700">
                                            <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
                                <h3 className="text-lg font-semibold dark:text-white">Security</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                                        <input type="password" className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2" placeholder="••••••••" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                                        <input type="password" className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2" placeholder="••••••••" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col gap-8">
                    <Navigation activeTab={activeTab} setActiveTab={setActiveTab} isMobile={isMobile} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                    <main className="flex-1">{renderContent()}</main>
                </div>
            </div>
        </div>
    );
}
