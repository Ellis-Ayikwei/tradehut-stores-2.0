import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserPreferencesContextType {
    currency: string;
    setCurrency: (currency: string) => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currency, setCurrency] = useState(() => {
        const savedCurrency = localStorage.getItem('currency');
        return savedCurrency || 'GH';
    });

    useEffect(() => {
        localStorage.setItem('currency', currency);
    }, [currency]);

    return <UserPreferencesContext.Provider value={{ currency, setCurrency }}>{children}</UserPreferencesContext.Provider>;
};

export const useUserPreferences = () => {
    const context = useContext(UserPreferencesContext);
    if (!context) {
        throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
    }
    return context;
};
