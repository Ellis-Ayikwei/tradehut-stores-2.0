import { BarChart3, Box, Edit2, Package, Plus, Settings, ShoppingCart, Star, Trash2, TrendingUp } from 'lucide-react';
const SellerSettingsPage = () => {
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
    )
}
export default SellerSettingsPage