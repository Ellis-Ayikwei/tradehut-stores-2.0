import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from '@/types/seller';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobile: boolean;
  navItems: NavItem[];
}

const Navigation = ({
  activeTab,
  setActiveTab,
  isMobile,
  navItems
}: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-[#dc711a]" />
          ) : (
            <Menu className="w-6 h-6 text-[#dc711a]" />
          )}
        </button>

        <div className={`
          fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
          ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}>
          <div className={`
            fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 shadow-xl
            transform transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    relative flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-all duration-200 w-full text-left
                    ${activeTab === item.id 
                      ? 'bg-orange-50 dark:bg-gray-700 text-[#dc711a]' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-orange-50/50 dark:hover:bg-gray-700/50'}
                  `}
                >
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'scale-110' : ''} transition-transform duration-200`} />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="absolute right-4 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full dark:bg-red-900/20 dark:text-red-400">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <nav className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8 sticky top-4 z-30">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-1 md:space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                relative flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg
                transition-all duration-200 group
                ${activeTab === item.id 
                  ? 'text-[#dc711a] bg-orange-50 dark:bg-gray-700' 
                  : 'text-gray-600 hover:text-[#dc711a] hover:bg-orange-50/50 dark:text-gray-300 dark:hover:bg-gray-700/50'}
              `}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'scale-110' : ''} transition-transform duration-200`} />
              <span className="font-medium hidden md:block">{item.label}</span>
              {item.badge && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full dark:bg-red-900/20 dark:text-red-400">
                  {item.badge}
                </span>
              )}
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs
                bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                pointer-events-none md:hidden whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;