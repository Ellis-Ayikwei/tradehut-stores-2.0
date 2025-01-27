import React from 'react';
import { formatPrice } from '../../utils/currency';
import { useUserPreferences } from '../../context/UserPreferencesContext';

interface PriceProps {
    amount: number;
    className?: string;
    isStrikethrough?: boolean;
}

const Price: React.FC<PriceProps> = ({ amount, className = '', isStrikethrough = false }) => {
    const { currency } = useUserPreferences();
    const formattedPrice = formatPrice(amount, currency);

    return <span className={`${className} ${isStrikethrough ? 'line-through' : ''}`}>{formattedPrice}</span>;
};

export default Price;
