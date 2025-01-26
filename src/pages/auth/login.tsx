'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/Auth/AuthLayout';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <AuthLayout title="Welcome back" subtitle="Sign in to your account">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email address
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full px-4 py-3 rounded-lg border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#dc711a] dark:bg-gray-700/50 dark:ring-gray-600 dark:text-white dark:focus:ring-[#dc711a]"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full px-4 py-3 rounded-lg border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#dc711a] dark:bg-gray-700/50 dark:ring-gray-600 dark:text-white dark:focus:ring-[#dc711a]"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="rememberMe"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-[#dc711a] focus:ring-[#dc711a] dark:border-gray-600"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Remember me
                        </label>
                    </div>

                    <Link to="/auth/forgot-password" className="text-sm font-semibold text-[#dc711a] hover:text-[#dc711a]/80">
                        Forgot password?
                    </Link>
                </div>

                <div>
                    <button
                        type="submit"
                        className="relative w-full inline-flex items-center justify-center px-4 py-3 rounded-lg text-white bg-gradient-to-r from-[#dc711a] to-[#dc711a]/80 hover:from-[#dc711a]/90 hover:to-[#dc711a]/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dc711a] transition-all duration-300 font-medium"
                    >
                        Sign in
                        <span className="absolute inset-x-0 h-[2px] bottom-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"></span>
                    </button>
                </div>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="inline-flex justify-center items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <img className="h-5 w-5 mr-2" src="/assets/images/google.svg" alt="Google" />
                            Google
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <img className="h-5 w-5 mr-2" src="/assets/images/github.svg" alt="GitHub" />
                            GitHub
                        </button>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/auth/register" className="font-semibold text-[#dc711a] hover:text-[#dc711a]/80">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
}
