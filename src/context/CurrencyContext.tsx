import React, { createContext, useContext, useState } from 'react';

export interface Currency {
    code: string;
    symbol: string;
    name: string;
    flag: string;
    rate: number;
}

export const currencies: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', rate: 1 },
    { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', rate: 0.85 },
    { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', rate: 0.73 },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', rate: 110.42 },
    { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', flag: '🇬🇭', rate: 12.5 },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', flag: '🇳🇬', rate: 850 },
    { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', flag: '🇰🇪', rate: 150 },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand', flag: '🇿🇦', rate: 19.2 },
];

interface CurrencyContextType {
    selectedCurrency: Currency;
    setSelectedCurrency: (currency: Currency) => void;
    formatPrice: (price: number) => string;
    convertPrice: (price: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
    const convertPrice = (price: number) => {
        return price * selectedCurrency.rate;
    };

    const formatPrice = (price: number) => {
        const convertedPrice = convertPrice(price);
        return `${selectedCurrency.symbol}${convertedPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    return <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, formatPrice, convertPrice }}>{children}</CurrencyContext.Provider>;
};

