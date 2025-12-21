'use client';

import React, { memo, useCallback, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Plus,
  MapPin,
  Zap,
  Activity,
  AlertTriangle,
  Package,
  Search,
  Bell,
  ShoppingCart,
  Store,
  Scan
} from 'lucide-react';

import { PageType } from '../types';
import { stats, lowStockItems, recentActivity, stores } from '../data/mockData';

interface DashboardContentProps {
  timeFilter: string;
  onTimeFilterChange: (filter: string) => void;
  onPageChange: (page: PageType) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = memo(({
  timeFilter,
  onTimeFilterChange,
  onPageChange
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'reports' | 'notifications'>('overview');

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (!token) {
      router.push('/signin');
    }
  }, [router]);

  // Memoized handlers for better performance
  const handleTimeFilterChange = useCallback((period: string) => {
    onTimeFilterChange(period);
  }, [onTimeFilterChange]);

  const handlePageChange = useCallback((page: PageType) => {
    onPageChange(page);
  }, [onPageChange]);

  const handleTabChange = useCallback((tab: 'overview' | 'analytics' | 'reports' | 'notifications') => {
    setActiveTab(tab);
  }, []);

  const handleAddProduct = useCallback(() => {
    // Handle add product action
    console.log('Add product clicked');
  }, []);

  const handleReorder = useCallback((itemName: string) => {
    // Handle reorder action
    console.log('Reorder clicked for:', itemName);
  }, []);

  // Memoized filtered data
  const filteredStats = useMemo(() => stats, []);
  const filteredLowStockItems = useMemo(() => lowStockItems, []);
  const filteredRecentActivity = useMemo(() => recentActivity, []);
  const filteredStores = useMemo(() => stores, []);

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 overflow-auto h-full transition-colors duration-300">
      {/* Main Content */}
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">All Stores Overview</h1>
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs lg:text-sm whitespace-nowrap">Jan 20, 2023 - Feb 09, 2023</span>
              </div>
              <button
                onClick={() => alert('Downloading report...')}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center space-x-2 text-sm font-medium shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Report</span>
              </button>
            </div>
          </div>


          {/* Navigation Tabs & Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl overflow-x-auto no-scrollbar w-full lg:w-fit">
              <button
                onClick={() => handleTabChange('overview')}
                className={`flex-1 lg:flex-none px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${activeTab === 'overview'
                  ? 'bg-white dark:bg-gray-700 text-brand-main dark:text-brand-300 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
              >
                Overview
              </button>
              <button
                onClick={() => handleTabChange('analytics')}
                className={`flex-1 lg:flex-none px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${activeTab === 'analytics'
                  ? 'bg-white dark:bg-gray-700 text-brand-main dark:text-brand-300 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
              >
                Analytics
              </button>
              <button
                onClick={() => handleTabChange('reports')}
                className={`flex-1 lg:flex-none px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${activeTab === 'reports'
                  ? 'bg-white dark:bg-gray-700 text-brand-main dark:text-brand-300 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
              >
                Reports
              </button>
              <button
                onClick={() => handleTabChange('notifications')}
                className={`flex-1 lg:flex-none px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${activeTab === 'notifications'
                  ? 'bg-white dark:bg-gray-700 text-brand-main dark:text-brand-300 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
              >
                Notifications
              </button>
            </div>

            <button
              onClick={() => router.push('/scanProduct')}
              className="group relative flex items-center justify-center space-x-2 px-6 py-2.5 bg-brand-main hover:bg-brand-700 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-brand-500/20 active:scale-95 overflow-hidden w-full lg:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Scan className="w-5 h-5" />
              <span className="whitespace-nowrap">SCAN PRODUCT BARCODE</span>
            </button>
          </div>

        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Upgrade Banner */}
            <div className="mb-6 bg-gradient-to-r from-brand-50 dark:from-brand-900/20 to-indigo-50 dark:to-indigo-900/20 border border-brand-200 dark:border-brand-800 rounded-lg p-4 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-brand-main dark:text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-brand-third dark:text-brand-200">Unlock AI-Powered Insights</h3>
                    <p className="text-xs text-brand-700 dark:text-brand-300">Get smart predictions, automated reorder suggestions, and advanced analytics</p>
                  </div>
                </div>
                <button
                  onClick={() => handlePageChange('ai-insights')}
                  className="bg-brand-main text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium"
                >
                  Upgrade to Pro
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Stores</div>
                  <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900/20 rounded-lg flex items-center justify-center">
                    <Store className="w-4 h-4 text-brand-main dark:text-brand-300" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">24</div>
                <div className="text-sm text-green-600 dark:text-green-400">+2 new stores this month</div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Inventory Value</div>
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">$2.4M</div>
                <div className="text-sm text-green-600">+12.3% from last month</div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Alerts</div>
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">47</div>
                <div className="text-sm text-orange-600">Items need reordering</div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Orders</div>
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">156</div>
                <div className="text-sm text-green-600">Processing across all stores</div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Overview Chart */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Store Performance Trend</h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {/* Simple bar chart representation */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-gray-800 rounded-t" style={{ height: '120px' }}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Jan</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-gray-800 rounded-t" style={{ height: '80px' }}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Feb</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-gray-800 rounded-t" style={{ height: '100px' }}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Mar</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-gray-800 rounded-t" style={{ height: '140px' }}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Apr</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-gray-800 rounded-t" style={{ height: '60px' }}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">May</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-gray-800 rounded-t" style={{ height: '90px' }}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Jun</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-gray-800 rounded-t" style={{ height: '110px' }}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Jul</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-gray-800 rounded-t" style={{ height: '95px' }}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Aug</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-gray-800 rounded-t" style={{ height: '85px' }}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Sep</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-gray-800 rounded-t" style={{ height: '70px' }}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Oct</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-gray-800 rounded-t" style={{ height: '105px' }}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Nov</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-gray-800 rounded-t" style={{ height: '130px' }}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Dec</span>
                  </div>
                </div>
              </div>

              {/* Recent Sales */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Top Performing Stores</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Best performing stores this month.</p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                        <Store className="w-4 h-4 text-brand-main" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Downtown Store</div>
                        <div className="text-xs text-gray-500">New York, NY</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">$45,231</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Store className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Mall Location</div>
                        <div className="text-xs text-gray-500">Los Angeles, CA</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">$38,920</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Store className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Airport Store</div>
                        <div className="text-xs text-gray-500">Chicago, IL</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">$32,150</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Store className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Strip Mall Store</div>
                        <div className="text-xs text-gray-500">Miami, FL</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">$28,450</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <Store className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Outlet Store</div>
                        <div className="text-xs text-gray-500">Houston, TX</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">$25,680</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">All Stores Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-brand-50 rounded-lg">
                  <div className="text-2xl font-bold text-brand-main dark:text-brand-300">24</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Stores</div>
                  <div className="text-xs text-green-600 mt-1">+2 new this month</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">$2.4M</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
                  <div className="text-xs text-green-600 mt-1">+12.3% from last month</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Orders</div>
                  <div className="text-xs text-green-600 mt-1">Processing across stores</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">47</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Low Stock Alerts</div>
                  <div className="text-xs text-orange-600 mt-1">Items need reordering</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Store Performance Ranking</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Store className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Downtown Store</div>
                      <div className="text-sm text-gray-500">New York, NY</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">$45,231</div>
                    <div className="text-sm text-green-600">+15.3% this month</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-brand-50 to-indigo-50 rounded-lg border border-brand-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                      <Store className="w-4 h-4 text-brand-main" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Mall Location</div>
                      <div className="text-sm text-gray-500">Los Angeles, CA</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">$38,920</div>
                    <div className="text-sm text-green-600">+12.1% this month</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Store className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Airport Store</div>
                      <div className="text-sm text-gray-500">Chicago, IL</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">$32,150</div>
                    <div className="text-sm text-green-600">+8.7% this month</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Store className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Strip Mall Store</div>
                      <div className="text-sm text-gray-500">Miami, FL</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">$28,450</div>
                    <div className="text-sm text-green-600">+6.2% this month</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <Store className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Outlet Store</div>
                      <div className="text-sm text-gray-500">Houston, TX</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">$25,680</div>
                    <div className="text-sm text-green-600">+4.8% this month</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Store Inventory Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Well-Stocked Stores</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Downtown Store</span>
                      <span className="text-xs text-green-600">95% stocked</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Mall Location</span>
                      <span className="text-xs text-green-600">92% stocked</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Airport Store</span>
                      <span className="text-xs text-green-600">88% stocked</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Stores Needing Attention</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Strip Mall Store</span>
                      <span className="text-xs text-orange-600">12 items low</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Outlet Store</span>
                      <span className="text-xs text-red-600">8 items critical</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Suburban Store</span>
                      <span className="text-xs text-yellow-600">5 items low</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Generate Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => alert('Generating Sales Report...')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-brand-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Sales Report</div>
                      <div className="text-sm text-gray-500">Monthly sales performance</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => alert('Generating Inventory Report...')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Inventory Report</div>
                      <div className="text-sm text-gray-500">Stock levels and movements</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => alert('Generating Store Performance Report...')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Store className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Store Performance</div>
                      <div className="text-sm text-gray-500">Individual store metrics</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => alert('Generating Low Stock Report...')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Low Stock Alert</div>
                      <div className="text-sm text-gray-500">Items needing reorder</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">Low Stock Alert</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Premium Headphones is running low (12 units remaining)</div>
                    <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-brand-50 rounded-lg">
                  <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Activity className="w-4 h-4 text-brand-main" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">New Order Received</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Order #12345 for $299.99 from Downtown Store</div>
                    <div className="text-xs text-gray-500 mt-1">4 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">Inventory Updated</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Wireless Charger stock updated (+50 units)</div>
                    <div className="text-xs text-gray-500 mt-1">6 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Store className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">Store Performance</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Mall Location exceeded monthly target by 15%</div>
                    <div className="text-xs text-gray-500 mt-1">1 day ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

DashboardContent.displayName = 'DashboardContent';

export default DashboardContent;