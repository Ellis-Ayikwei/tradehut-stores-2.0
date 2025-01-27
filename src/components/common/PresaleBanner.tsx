import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faTag, faGift } from '@fortawesome/free-solid-svg-icons';
import { useCurrency } from '../../context/CurrencyContext';

const PresaleBanner = () => {
    const { formatPrice } = useCurrency();
    const presalePrice = formatPrice(7.99);
    const regularPrice = formatPrice(9.99);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0A0A] text-white overflow-hidden relative rounded-xl my-8 border border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Main Content */}
                    <div className="space-y-4">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3">
                            <img src="/assets/images/flinthead (3).png" alt="Flint Logo" className="h-8 w-auto brightness-0 invert" />
                            <span className="text-2xl font-bold tracking-tight text-white">FLINT</span>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-2 text-gray-400">
                            <FontAwesomeIcon icon={faRocket} className="w-5 h-5" />
                            <span className="text-sm font-medium tracking-wider uppercase">Platform Launch Presale</span>
                        </motion.div>
                        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-3xl md:text-4xl font-bold">
                            Early Access Membership
                        </motion.h2>
                        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-gray-400">
                            Presale Starts: February 8, 2025 | Platform Launch: March 20, 2025
                            <br />
                        </motion.p>

                        {/* Benefits */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="grid grid-cols-2 gap-4 mt-6">
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faTag} className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-300">20% Off All Products</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faGift} className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-300">Priority Access & Support</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side - Call to Action */}
                    <div className="text-center space-y-6">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                            <h3 className="text-2xl font-bold mb-2">Join the Revolution</h3>
                            <p className="text-gray-400 mb-4">Get exclusive benefits and early access to all platform features and products</p>
                            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">Join Presale</button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24" />
            </div>
        </motion.div>
    );
};

export default PresaleBanner;
