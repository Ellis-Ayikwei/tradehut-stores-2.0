import { DashboardCard } from '@/types/seller';

const DashboardMetricCard = ({ title, value, icon: Icon, trend, className = '' }: DashboardCard) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold dark:text-white">{value}</p>
      </div>
      <div className="p-2 bg-orange-50 dark:bg-gray-700 rounded-lg">
        <Icon className="w-5 h-5 text-[#dc711a]" />
      </div>
    </div>
    {trend !== undefined && (
      <div className="mt-4 flex items-center">
        <svg className={`w-4 h-4 ${trend >= 0 ? 'text-green-500' : 'text-red-500'} mr-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {trend >= 0 ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          )}
        </svg>
        <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
      </div>
    )}
  </div>
);

export default DashboardMetricCard;