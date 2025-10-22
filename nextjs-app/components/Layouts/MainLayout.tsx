'use client'

import Navbar from '@/components/Navigation/Navbar'
import Footer from './Footer'

interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-crypto-bg dark:to-crypto-card">
            <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}