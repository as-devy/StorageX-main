'use client';

import React, { memo, useCallback, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  Calendar,
  Download,
  Filter,
  Eye,
  RefreshCw
} from 'lucide-react';
import { PageType } from '../types';

interface AnalyticsContentProps {
  timeFilter: string;
  onTimeFilterChange: (filter: string) => void;
  onPageChange: (page: PageType) => void;
}

const AnalyticsContent: React.FC<AnalyticsContentProps> = memo(({
  timeFilter,
  onTimeFilterChange,
  onPageChange
}) => {
  const handleTimeFilterChange = useCallback((period: string) => {
    onTimeFilterChange(period);
  }, [onTimeFilterChange]);

  const handlePageChange = useCallback((page: PageType) => {
    onPageChange(page);
  }, [onPageChange]);

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 overflow-auto h-full transition-colors duration-300">
      {/* Main Content */}
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Comprehensive insights into your business performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Jan 20, 2023 - Feb 09, 2023</span>
              </div>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-300 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button className="px-4 py-2 bg-white text-gray-900 dark:text-gray-100 rounded-md text-sm font-medium shadow-sm">
              Overview
            </button>
            <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium">
              Sales
            </button>
            <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium">
              Inventory
            </button>
            <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium">
              Customers
            </button>
            <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium">
              Financial
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">$284,731</div>
            <div className="text-sm text-green-600">+12.3% from last month</div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">1,247</div>
            <div className="text-sm text-green-600">+8.2% from last month</div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Customers</div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">892</div>
            <div className="text-sm text-green-600">+5.7% from last month</div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Inventory Value</div>
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">$2.4M</div>
            <div className="text-sm text-green-600">+3.1% from last month</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Revenue Trend</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-1">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '120px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Jan</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '90px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Feb</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '110px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Mar</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '140px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Apr</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '70px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">May</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '100px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Jun</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '125px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Jul</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '105px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Aug</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '95px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Sep</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '80px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Oct</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '115px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Nov</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '135px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Dec</span>
              </div>
            </div>
          </div>

          {/* Orders Chart */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Orders by Status</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
                </div>
              </div>
            </div>
            <div className="h-64 flex items-end justify-center space-x-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 bg-green-500 rounded-t" style={{height: '180px'}}></div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">892</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Completed</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 bg-blue-500 rounded-t" style={{height: '120px'}}></div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">234</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Processing</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 bg-yellow-500 rounded-t" style={{height: '80px'}}></div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">121</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Products */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Selling Products</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">📱</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">iPhone 15 Pro</div>
                    <div className="text-xs text-gray-500">Electronics</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">156</div>
                  <div className="text-xs text-green-600">+12.3%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">📱</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Samsung Galaxy S24</div>
                    <div className="text-xs text-gray-500">Electronics</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">89</div>
                  <div className="text-xs text-green-600">+8.7%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">💻</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">MacBook Pro M3</div>
                    <div className="text-xs text-gray-500">Computers</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">67</div>
                  <div className="text-xs text-green-600">+15.2%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Growth */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Customer Growth</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">New Customers</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+156</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Returning Customers</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+89</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Customer Retention</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">94.2%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Order Value</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">$127.50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Status */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Inventory Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Products</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">In Stock</span>
                <span className="text-sm font-medium text-green-600">1,217</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Low Stock</span>
                <span className="text-sm font-medium text-orange-600">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Out of Stock</span>
                <span className="text-sm font-medium text-red-600">7</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Stock Turnover</span>
                <span className="text-sm font-medium text-blue-600">4.2x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

AnalyticsContent.displayName = 'AnalyticsContent';

export default AnalyticsContent;
