import { faCheck, faChevronDown, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { currencies, useCurrency } from '../../context/CurrencyContext';

const CurrencySelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { selectedCurrency, setSelectedCurrency } = useCurrency();

    const handleCurrencySelect = (currency: (typeof currencies)[0]) => {
        setSelectedCurrency(currency);
        setIsOpen(false);
    };
    const getFlagUrl = ({ countryCode, size = '64x48' }: { countryCode: string; size?: string }) => {
        return `https://flagcdn.com/16x12/${countryCode.toLowerCase()}.png`;
    };
    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-black hover:text-primary transition-colors py-2 px-3 border border-gray-100 rounded-lg hover:bg-white/10"
            >
                <span className="text-lg">
                    {' '}
                    <img src={getFlagUrl({ countryCode: selectedCurrency?.countryCode })} alt={`${selectedCurrency.flag} flag`} width="16" height="12" />
                </span>
                <span className="text-sm font-medium">{selectedCurrency.code}</span>
                <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 mt-2 w-72 rounded-xl bg-white shadow-xl z-50 overflow-hidden border border-gray-100"
                        >
                            <div className="p-3 border-b border-gray-100">
                                <div className="flex items-center gap-2 text-primary-400">
                                    <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />
                                    <span className="text-sm font-medium">Select Currency</span>
                                </div>
                            </div>
                            <div className="max-h-80 scroll-hide overflow-y-auto">
                                <div className="py-2">
                                    {currencies.map((currency) => (
                                        <motion.button
                                            key={currency.code}
                                            onClick={() => handleCurrencySelect(currency)}
                                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                                            whileHover={{ x: 4 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">
                                                    {' '}
                                                    <img src={getFlagUrl({ countryCode: currency?.countryCode })} alt={`${currency.flag} flag`} width="16" height="12" />
                                                </span>
                                                <div className="text-left">
                                                    <div className="font-medium text-gray-900">{currency.code}</div>
                                                    <div className="text-sm text-gray-500">{currency.name}</div>
                                                </div>
                                            </div>
                                            {selectedCurrency.code === currency.code && (
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                    <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-500" />
                                                </motion.div>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                            <div className="p-3 bg-gray-50 border-t border-gray-100">
                                <p className="text-xs text-gray-500 text-center">All prices will be converted to your selected currency</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CurrencySelector;
