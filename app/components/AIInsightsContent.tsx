'use client';

import React, { memo, useCallback, useMemo } from 'react';
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
  Brain,
  Target,
  BarChart3,
  Cpu,
  Lightbulb
} from 'lucide-react';
import { PageType } from '../types';

interface AIInsightsContentProps {
  timeFilter: string;
  onTimeFilterChange: (filter: string) => void;
  onPageChange: (page: PageType) => void;
}

const AIInsightsContent: React.FC<AIInsightsContentProps> = memo(({ 
  timeFilter, 
  onTimeFilterChange, 
  onPageChange 
}) => {
  return (
    <div className="flex-1 bg-white dark:bg-gray-900 overflow-auto h-full transition-colors duration-300">
      {/* Main Content */}
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">AI Insights</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Powered by advanced machine learning algorithms for Amr Dajani</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Jan 20, 2023 - Feb 09, 2023</span>
              </div>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-300 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export AI Report</span>
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm font-medium shadow-sm">
              AI Overview
            </button>
            <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium">
              Forecasting
            </button>
            <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium">
              Optimization
            </button>
            <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium">
              Insights
            </button>
          </div>
        </div>

        {/* AI KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Inventory Value</div>
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">$2,847,231</div>
            <div className="text-sm text-green-600">+12.3% from last month</div>
            <div className="mt-2 text-xs text-gray-500">AI Predicted: +15.2% next month</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Reorder Alerts</div>
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">23</div>
            <div className="text-sm text-orange-600">Items need reordering</div>
            <div className="mt-2 text-xs text-gray-500">AI suggests optimal quantities</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Demand Forecast Accuracy</div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">94.2%</div>
            <div className="text-sm text-green-600">AI prediction accuracy</div>
            <div className="mt-2 text-xs text-gray-500">Based on 6 months of data</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Cost Savings</div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">$47,832</div>
            <div className="text-sm text-green-600">Saved this month</div>
            <div className="mt-2 text-xs text-gray-500">Through AI optimization</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* AI Demand Forecasting Chart */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Demand Forecasting</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Predicted</span>
                <div className="w-3 h-3 bg-gray-300 rounded-full ml-4"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Actual</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-1">
              {/* AI Forecast Chart */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '120px'}}></div>
                <div className="w-6 bg-gray-300 rounded-t" style={{height: '110px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Jan</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '90px'}}></div>
                <div className="w-6 bg-gray-300 rounded-t" style={{height: '85px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Feb</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '110px'}}></div>
                <div className="w-6 bg-gray-300 rounded-t" style={{height: '105px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Mar</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '140px'}}></div>
                <div className="w-6 bg-gray-300 rounded-t" style={{height: '135px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Apr</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '70px'}}></div>
                <div className="w-6 bg-gray-300 rounded-t" style={{height: '65px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">May</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '100px'}}></div>
                <div className="w-6 bg-gray-300 rounded-t" style={{height: '95px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Jun</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '125px'}}></div>
                <div className="w-6 bg-gray-300 rounded-t" style={{height: '120px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Jul</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '105px'}}></div>
                <div className="w-6 bg-gray-300 rounded-t" style={{height: '100px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Aug</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '95px'}}></div>
                <div className="w-6 bg-gray-300 rounded-t" style={{height: '90px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Sep</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '80px'}}></div>
                <div className="w-6 bg-gray-300 rounded-t" style={{height: '75px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Oct</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '115px'}}></div>
                <div className="w-6 bg-gray-300 rounded-t" style={{height: '110px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Nov</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-blue-500 rounded-t" style={{height: '135px'}}></div>
                <div className="w-6 bg-gray-300 rounded-t" style={{height: '130px'}}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Dec</span>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">AI Accuracy:</span> 94.2% prediction accuracy over 6 months
            </div>
          </div>

          {/* AI Reorder Recommendations */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">AI Reorder Recommendations</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Smart suggestions based on demand patterns and lead times</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-orange-600">IP</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">iPhone 15 Pro</div>
                    <div className="text-xs text-gray-500">Current: 8 units • Lead time: 14 days</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-orange-600">Reorder: 45 units</div>
                  <div className="text-xs text-gray-500">AI Confidence: 92%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-yellow-600">SG</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Samsung Galaxy S24</div>
                    <div className="text-xs text-gray-500">Current: 3 units • Lead time: 10 days</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-yellow-600">Reorder: 28 units</div>
                  <div className="text-xs text-gray-500">AI Confidence: 88%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-red-600">AP</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">AirPods Pro</div>
                    <div className="text-xs text-gray-500">Current: 0 units • Lead time: 7 days</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-red-600">Reorder: 67 units</div>
                  <div className="text-xs text-gray-500">AI Confidence: 95%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">MB</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">MacBook Pro M3</div>
                    <div className="text-xs text-gray-500">Current: 12 units • Lead time: 21 days</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-600">Reorder: 18 units</div>
                  <div className="text-xs text-gray-500">AI Confidence: 85%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* AI Anomaly Detection */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">AI Anomaly Detection</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Unusual spike detected</span>
                </div>
                <span className="text-xs text-red-600 font-medium">High</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Seasonal pattern change</span>
                </div>
                <span className="text-xs text-yellow-600 font-medium">Medium</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Demand trend stable</span>
                </div>
                <span className="text-xs text-green-600 font-medium">Low</span>
              </div>
            </div>
          </div>

          {/* Inventory Optimization */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Inventory Optimization</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Carrying Cost Reduction</span>
                <span className="text-sm font-medium text-green-600">-23.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Stockout Prevention</span>
                <span className="text-sm font-medium text-green-600">+18.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Turnover Rate</span>
                <span className="text-sm font-medium text-green-600">+12.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Space Utilization</span>
                <span className="text-sm font-medium text-green-600">+8.9%</span>
              </div>
            </div>
          </div>

          {/* AI Performance Metrics */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">AI Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Prediction Accuracy</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full w-4/5"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">94.2%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Cost Savings</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-3/4"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">$47K</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Processing Speed</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-full"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">2.3s</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Model Confidence</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full w-5/6"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">91.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

AIInsightsContent.displayName = 'AIInsightsContent';

export default AIInsightsContent;