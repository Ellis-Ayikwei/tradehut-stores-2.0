import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Currency {
    code: string;
    countryCode: string;
    symbol: string;
    name: string;
    flag: string;
    rate: number; // Initial rate (might be outdated, fetched rates will override)
}

export const currencies: Currency[] = [
    { code: 'USD', countryCode: 'US', symbol: '$', name: 'US Dollar', flag: '🇺🇸', rate: 1 },
    { code: 'EUR', countryCode: 'EU', symbol: '€', name: 'Euro', flag: '🇪🇺', rate: 0.85 },
    { code: 'GBP', countryCode: 'GB', symbol: '£', name: 'British Pound', flag: '🇬🇧', rate: 0.73 },
    { code: 'JPY', countryCode: 'JP', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', rate: 110.42 },
    { code: 'GHS', countryCode: 'GH', symbol: '₵', name: 'Ghanaian Cedi', flag: '🇬🇭', rate: 1 }, // Base currency
    { code: 'NGN', countryCode: 'NG', symbol: '₦', name: 'Nigerian Naira', flag: '🇳🇬', rate: 850 },
    { code: 'KES', countryCode: 'KE', symbol: 'KSh', name: 'Kenyan Shilling', flag: '🇰🇪', rate: 150 },
    { code: 'ZAR', countryCode: 'ZA', symbol: 'R', name: 'South African Rand', flag: '🇿🇦', rate: 19.2 },
];

interface CurrencyContextType {
    selectedCurrency: Currency;
    setSelectedCurrency: (currency: Currency) => void;
    formatPrice: (price: number) => string;
    isLoading: boolean;
    error: string | null;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};

const roundToTwoDecimals = (number: number): number => {
    return Math.round((number + Number.EPSILON) * 100) / 100;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[4]); // Default: GHS
    const [exchangeRates, setExchangeRates] = useState<Record<string, number> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            setIsLoading(true);
            setError(null); // Clear any previous errors
            try {
                const response = await fetch(`https://open.er-api.com/v6/latest/GHS`); // Base currency: GHS
                if (!response.ok) {
                    const errorData = await response.json(); // Try to get error details
                    throw new Error(`HTTP error! status: ${response.status} - ${errorData?.message || response.statusText}`);
                }
                const data = await response.json();
                setExchangeRates(data.rates);
            } catch (err: any) { // Catch any type of error
                console.error('Error fetching exchange rates:', err);
                setError(err.message); // Set the error message to display
            } finally {
                setIsLoading(false);
            }
        };

        fetchExchangeRates();
    }, []);

    const convertPrice = (price: number): number => {
        if (typeof price !== 'number' || isNaN(price) || !exchangeRates) {
            return 0;
        }

        const rate = exchangeRates[selectedCurrency.code] || 1; // Default to 1 if rate not found
        const converted = price * rate;
        return roundToTwoDecimals(converted);
    };

    const formatPrice = (price: number): string => {
        if (typeof price !== 'number' || isNaN(price)) {
            return `${selectedCurrency.symbol}0.00`;
        }

        const convertedPrice = convertPrice(price);

        const formatter = new Intl.NumberFormat(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        const formattedValue = formatter.format(convertedPrice);

        return `${selectedCurrency.symbol}${['JPY', 'KRW'].includes(selectedCurrency.code) ? Math.round(convertedPrice) : formattedValue}`;
    };

    const value = {
        selectedCurrency,
        setSelectedCurrency,
        formatPrice,
        isLoading,
        error, // Expose the error state
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
            {isLoading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>Error: {error}</div>} {/* Display error message */}
        </CurrencyContext.Provider>
    );
};