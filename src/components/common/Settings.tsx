import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faLaptop, faGlobe, faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('en');
    const [currency, setCurrency] = useState('USD');

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Settings</h2>

            {/* Theme Settings */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Theme Preferences</h3>
                <div className="grid grid-cols-3 gap-4">
                    <button
                        onClick={() => setTheme('light')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-all ${theme === 'light' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        <FontAwesomeIcon icon={faSun} />
                        <span>Light</span>
                    </button>
                    <button
                        onClick={() => setTheme('dark')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-all ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        <FontAwesomeIcon icon={faMoon} />
                        <span>Dark</span>
                    </button>
                    <button
                        onClick={() => setTheme('system')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-all ${theme === 'system' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        <FontAwesomeIcon icon={faLaptop} />
                        <span>System</span>
                    </button>
                </div>
            </div>

            {/* Language Settings */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Language</h3>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-3 bg-gray-100 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black">
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                    <option value="de">Deutsch</option>
                </select>
            </div>

            {/* Currency Settings */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Currency</h3>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-3 bg-gray-100 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                </select>
            </div>

            {/* Save Button */}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors">
                Save Preferences
            </motion.button>
        </div>
    );
};

export default Settings;
