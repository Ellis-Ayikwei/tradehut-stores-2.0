import DashboardMetricCard from '../../components/Seller/DashboardMetricCard';
import { BarChart3, Box, Edit2, Package, Plus, Settings, ShoppingCart, Star, Trash2, TrendingUp } from 'lucide-react';
import { products } from '../../data/products';

interface DashboardCard {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    trend?: number;
    className?: string;
}


const DashboardCard = () => {
    const stats: DashboardCard[] = [
        { title: 'Total Sales', value: '$15,000', icon: TrendingUp, trend: 12.5 },
        { title: 'Total Orders', value: '150', icon: ShoppingCart, trend: 8.2 },
        { title: 'Average Rating', value: '4.8', icon: Star, trend: 2.1 },
        { title: 'Active Listings', value: products.length, icon: Box, trend: -4.3 },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <DashboardMetricCard key={index} {...stat} />
                ))}
            </div>
            {/* Add more dashboard content here */}
        </div>
    );
};

export default DashboardCard;
