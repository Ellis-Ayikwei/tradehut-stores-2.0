type CurrencyConfig = {
    code: string;
    symbol: string;
    position: 'before' | 'after';
};

const currencies: { [key: string]: CurrencyConfig } = {
    GH: {
        code: 'GHS',
        symbol: '₵',
        position: 'before',
    },
    US: {
        code: 'USD',
        symbol: '$',
        position: 'before',
    },
    GB: {
        code: 'GBP',
        symbol: '£',
        position: 'before',
    },
    EU: {
        code: 'EUR',
        symbol: '€',
        position: 'before',
    },
};

// You can expand this to use actual geolocation or user preferences
const getCurrentCountry = (): string => {
    // For now, defaulting to Ghana
    return 'GH';
};

export const formatPrice = (price: number, userCurrency?: string): string => {
    const currency = currencies[userCurrency || getCurrentCountry()] || currencies.GH;

    const formattedPrice = price.toFixed(2);
    return currency.position === 'before' ? `${currency.symbol}${formattedPrice}` : `${formattedPrice}${currency.symbol}`;
};
