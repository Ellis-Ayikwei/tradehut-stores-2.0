'use client';

import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div className="relative flex min-h-screen flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

                <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="mx-auto w-auto">
                        <Link to="/" className="flex justify-center">
                            <img src="/assets/images/tradehut3.png" alt="TradeHut" className="h-12 dark:invert" />
                        </Link>
                    </div>

                    <div className="mt-6 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
                    </div>

                    <div className="mt-8">
                        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 ring-1 ring-gray-900/5 backdrop-blur-lg">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
