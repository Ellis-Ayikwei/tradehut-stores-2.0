'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'

interface CurrencyContextType {
    currency: string
    setCurrency: (currency: string) => void
    exchangeRates: { [key: string]: number }
    convert: (amount: number, from?: string, to?: string) => number
    formatCurrency: (amount: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currency, setCurrency] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('selectedCurrency') || 'USD'
        }
        return 'USD'
    })

    const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.14,
        AUD: 1.35,
        CAD: 1.25,
        CHF: 0.91,
        CNY: 6.45,
        SEK: 8.51,
        NZD: 1.42,
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedCurrency', currency)
        }
    }, [currency])

    const convert = (amount: number, from: string = 'USD', to: string = currency): number => {
        if (from === to) return amount
        const amountInUSD = amount / exchangeRates[from]
        return amountInUSD * exchangeRates[to]
    }

    const formatCurrency = (amount: number): string => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
        return formatter.format(amount)
    }

    const value: CurrencyContextType = {
        currency,
        setCurrency,
        exchangeRates,
        convert,
        formatCurrency,
    }

    return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export const useCurrency = (): CurrencyContextType => {
    const context = useContext(CurrencyContext)
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider')
    }
    return context
}