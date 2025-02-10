'use client';

import { useState } from 'react';

import { 
  BarChart3, 
  Package, 
  Settings, 
  ShoppingCart 
} from 'lucide-react';
import { useMobileDetection } from '../../hooks/useMobileDetection';
import { NavItem } from '../../types';
import Navigation from './Navigation';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const isMobile = useMobileDetection();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package, badge: 3 },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: 5 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'products':
        return <ProductsContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <div>Coming Soon</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <Navigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={isMobile}
            navItems={navItems}
          />
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;