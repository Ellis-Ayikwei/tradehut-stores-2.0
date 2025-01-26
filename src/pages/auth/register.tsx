'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/Auth/AuthLayout';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle registration logic here
        console.log('Register:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <AuthLayout title="Create an account" subtitle="Join our community today">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#dc711a] focus:ring-[#dc711a] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#dc711a] focus:ring-[#dc711a] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#dc711a] focus:ring-[#dc711a] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#dc711a] focus:ring-[#dc711a] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center">
                    <input
                        id="agree-terms"
                        name="agreeToTerms"
                        type="checkbox"
                        required
                        className="h-4 w-4 rounded border-gray-300 text-[#dc711a] focus:ring-[#dc711a] dark:border-gray-600"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                    />
                    <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        I agree to the{' '}
                        <Link to="/terms" className="text-[#dc711a] hover:text-[#dc711a]/80">
                            Terms and Conditions
                        </Link>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#dc711a] hover:bg-[#dc711a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dc711a]"
                >
                    Create Account
                </button>

                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/auth/login" className="font-medium text-[#dc711a] hover:text-[#dc711a]/80">
                            Sign in
                        </Link>
                    </p>
                </div>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or sign up with</span>
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
            </form>
        </AuthLayout>
    );
}
