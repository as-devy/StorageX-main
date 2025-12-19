'use client';

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import DashboardContent from './DashboardContent';
import InventoryContent from './InventoryContent';
import LowStockContent from './LowStockContent';
import AIInsightsContent from './AIInsightsContent';
import StoresContent from './StoresContent';
import SettingsContent from './SettingsContent';
import CustomersContent from './CustomersContent';
import ProductsContent from './ProductsContent';
import OrdersContent from './OrdersContent';
import SuppliersContent from './SuppliersContent';
import AnalyticsContent from './AnalyticsContent';
import SupportContent from './SupportContent';
import { PageType } from '../types';
import ErrorBoundary from './ErrorBoundary';
import {
  Search,
  Home,
  Package,
  ShoppingCart,
  Store,
  Truck,
  BarChart3,
  Settings,
  ChevronDown,
  Bell
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useRouter } from 'next/navigation';

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface UserData {
  id: string;
  email: string;
  full_name?: string;
  company_name?: string;
  user_metadata?: {
    full_name?: string;
    company_name?: string;
  };
}

interface DashboardLayoutProps {
  initialPage?: PageType;
  onPageChange?: (page: PageType) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  initialPage = 'dashboard',
  onPageChange
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<PageType>(initialPage);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [timeFilter, setTimeFilter] = useState<string>('7d');
  const [inventoryFilter, setInventoryFilter] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState<boolean>(false);
  const [isAnalyticsDropdownOpen, setIsAnalyticsDropdownOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const analyticsDropdownRef = useRef<HTMLDivElement>(null);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUserProfile = async (retryCount = 0) => {
      try {
        console.log('📍 DashboardLayout: Checking for auth token...');
        const token = localStorage.getItem('auth_token');

        if (!token) {
          console.warn('⚠️ DashboardLayout: No token found');

          // Give localStorage a chance to populate (race condition fix)
          if (retryCount < 2) {
            console.log('🔄 DashboardLayout: Retrying in 200ms... (attempt', retryCount + 1, ')');
            setTimeout(() => fetchUserProfile(retryCount + 1), 200);
            return;
          }

          // No redirect - just stop loading and let user see they're not authenticated
          console.warn('⚠️ DashboardLayout: No token after retries - stopping');
          setIsLoadingUser(false);
          return;
        }

        console.log('✅ DashboardLayout: Token found, fetching user profile...');
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ DashboardLayout: User profile loaded successfully');
          setUser(data.user);
          // Store user data in localStorage for future use
          if (data.user) {
            localStorage.setItem('user_data', JSON.stringify(data.user));
          }
        } else if (response.status === 401) {
          console.error('❌ DashboardLayout: 401 - Token invalid/expired');
          // Don't automatically clear and redirect - let user see the error
          // They can manually sign out or the session will expire naturally
          setIsLoadingUser(false);
          console.warn('⚠️ DashboardLayout: Auth failed but NOT redirecting to prevent logout loops');
          return;
        }
      } catch (error) {
        console.error('❌ DashboardLayout: Error fetching user profile:', error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    // Check if user data is stored from login
    const storedUser = localStorage.getItem('user_data');
    console.log('📍 DashboardLayout: Stored user data present:', !!storedUser);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsLoadingUser(false);
        console.log('✅ DashboardLayout: Using cached user data');
      } catch (e) {
        console.warn('⚠️ DashboardLayout: Failed to parse stored user, fetching from API');
        // If parsing fails, fetch from API
        fetchUserProfile();
      }
    } else {
      console.log('🔄 DashboardLayout: No cached user data, fetching from API...');
      fetchUserProfile();
    }
  }, [router]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSettingsDropdownOpen(false);
      }
      if (analyticsDropdownRef.current && !analyticsDropdownRef.current.contains(event.target as Node)) {
        setIsAnalyticsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePageChange = useCallback((page: PageType): void => {
    setCurrentPage(page);
    setSelectedItems([]);
    if (onPageChange) {
      onPageChange(page);
    }
  }, [onPageChange]);

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: <Home className="w-4 h-4" /> },
    { id: 'customers', label: 'Customers', icon: <Package className="w-4 h-4" /> },
    { id: 'products', label: 'Products', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', icon: <Store className="w-4 h-4" /> },
    { id: 'suppliers', label: 'Suppliers', icon: <Truck className="w-4 h-4" /> }
  ];

  // Memoized content component to prevent unnecessary re-renders
  const renderContent = useMemo(() => {
    const commonProps = {
      onPageChange: handlePageChange,
    };

    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardContent
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            onPageChange={handlePageChange}
          />
        );
      case 'inventory':
        return (
          <InventoryContent
            inventoryFilter={inventoryFilter}
            onInventoryFilterChange={setInventoryFilter}
            selectedItems={selectedItems}
            onSelectedItemsChange={setSelectedItems}
          />
        );
      case 'low-stock':
        return <LowStockContent />;
      case 'customers':
        return (
          <CustomersContent
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            onPageChange={handlePageChange}
          />
        );
      case 'products':
        return (
          <ProductsContent
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            onPageChange={handlePageChange}
          />
        );
      case 'orders':
        return (
          <OrdersContent
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            onPageChange={handlePageChange}
          />
        );
      case 'suppliers':
        return (
          <SuppliersContent
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            onPageChange={handlePageChange}
          />
        );
      case 'analytics':
        return (
          <AnalyticsContent
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            onPageChange={handlePageChange}
          />
        );
      case 'ai-insights':
        return (
          <AIInsightsContent
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            onPageChange={handlePageChange}
          />
        );
      case 'stores':
        return <StoresContent />;
      case 'settings':
      case 'general':
      case 'stores-config':
      case 'ai-settings':
      case 'notifications':
      case 'billing':
        return (
          <SettingsContent
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            onPageChange={handlePageChange}
          />
        );
      case 'documentation':
        return (
          <div className="flex-1 bg-slate-50 overflow-auto">
            <div className="bg-white border-b border-slate-200 p-6">
              <h1 className="text-2xl font-bold text-slate-900">API Documentation</h1>
              <p className="text-slate-600 mt-1">Complete API reference and integration guides</p>
            </div>
            <div className="p-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">API Documentation</h3>
                <p className="text-slate-600">Complete API documentation interface would go here with endpoints, authentication, and examples.</p>
              </div>
            </div>
          </div>
        );
      case 'support':
        return (
          <SupportContent
            onPageChange={handlePageChange}
          />
        );
      default:
        return (
          <DashboardContent
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            onPageChange={handlePageChange}
          />
        );
    }
  }, [currentPage, timeFilter, inventoryFilter, selectedItems, handlePageChange]);

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="flex flex-col h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          {/* Top Navigation Bar */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 transition-colors duration-300">
            <div className="flex items-center justify-between">
              {/* Left Side - User Profile */}
              <div className="flex items-center space-x-3">
                {/* Avatar Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsSettingsDropdownOpen(!isSettingsDropdownOpen)}
                    className="flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-1 transition-colors"
                    disabled={isLoadingUser}
                  >
                    <div className="w-7 h-7 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 font-semibold text-xs">
                      {isLoadingUser ? '...' : getUserInitials(user)}
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                      {isLoadingUser ? 'Loading...' : getUserDisplayName(user)}
                    </span>
                    <ChevronDown className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {isSettingsDropdownOpen && !isLoadingUser && user && (
                    <div className="absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 transition-colors duration-300">
                      <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                        <div className="text-xs font-medium text-gray-900 dark:text-gray-100">
                          {getUserDisplayName(user)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                        {user.company_name || user.user_metadata?.company_name ? (
                          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {user.company_name || user.user_metadata?.company_name}
                          </div>
                        ) : null}
                      </div>
                      <button
                        onClick={() => {
                          handlePageChange('settings');
                          setIsSettingsDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors"
                      >
                        <Settings className="w-3 h-3" />
                        <span>Settings</span>
                      </button>
                      <div className="px-3 py-2 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-700 dark:text-gray-300">Theme</span>
                          <ThemeToggle size="sm" />
                        </div>
                      </div>
                      <div className="border-t border-gray-100 dark:border-gray-700 mt-1">
                        <button
                          onClick={() => {
                            // Clear auth data
                            localStorage.removeItem('auth_token');
                            localStorage.removeItem('user_data');
                            // Redirect to home
                            router.push('/');
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center space-x-1 ml-6">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handlePageChange(item.id as PageType)}
                      className={`flex items-center space-x-1 px-3 py-2 text-xs font-medium transition-all duration-200 rounded-lg ${currentPage === item.id
                        ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-main dark:text-brand-300 border border-brand-200 dark:border-brand-800 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                    >
                      <div className={`transition-colors ${currentPage === item.id ? 'text-brand-main' : 'text-gray-500'
                        }`}>
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                    </button>
                  ))}

                  {/* Analytics Dropdown */}
                  <div className="relative" ref={analyticsDropdownRef}>
                    <button
                      onClick={() => setIsAnalyticsDropdownOpen(!isAnalyticsDropdownOpen)}
                      className={`flex items-center space-x-1 px-3 py-2 text-xs font-medium transition-all duration-200 rounded-lg ${currentPage === 'analytics' || currentPage === 'ai-insights'
                        ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-main dark:text-brand-300 border border-brand-200 dark:border-brand-800 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                    >
                      <div className={`transition-colors ${currentPage === 'analytics' || currentPage === 'ai-insights' ? 'text-brand-main' : 'text-gray-500'
                        }`}>
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <span>Analytics</span>
                      <ChevronDown className={`w-3 h-3 transition-colors ${currentPage === 'analytics' || currentPage === 'ai-insights' ? 'text-brand-500' : 'text-gray-400'
                        }`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isAnalyticsDropdownOpen && (
                      <div className="absolute left-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 transition-colors duration-300">
                        <button
                          onClick={() => {
                            handlePageChange('analytics');
                            setIsAnalyticsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs flex items-center space-x-2 transition-colors ${currentPage === 'analytics'
                            ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-main dark:text-brand-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                          <BarChart3 className={`w-3 h-3 ${currentPage === 'analytics' ? 'text-brand-main dark:text-brand-300' : 'text-gray-500 dark:text-gray-400'
                            }`} />
                          <span>Analytics</span>
                        </button>
                        <button
                          onClick={() => {
                            handlePageChange('ai-insights');
                            setIsAnalyticsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs flex items-center space-x-2 transition-colors ${currentPage === 'ai-insights'
                            ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-main dark:text-brand-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                          <BarChart3 className={`w-3 h-3 ${currentPage === 'ai-insights' ? 'text-brand-main dark:text-brand-300' : 'text-gray-500 dark:text-gray-400'
                            }`} />
                          <span>AI Insights</span>
                        </button>
                      </div>
                    )}
                  </div>
                </nav>
              </div>

              {/* Right Side - Search and Actions */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-7 pr-3 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-transparent w-48 transition-colors"
                  />
                </div>
                <button
                  onClick={() => alert('You have 3 new notifications')}
                  className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {renderContent}
          </div>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

// Helper functions for user data
const getUserDisplayName = (user: UserData | null): string => {
  if (!user) return 'User';

  const fullName = user.full_name || user.user_metadata?.full_name;
  if (fullName) return fullName;

  // Fallback to email username
  if (user.email) {
    return user.email.split('@')[0];
  }

  return 'User';
};

const getUserInitials = (user: UserData | null): string => {
  if (!user) return 'U';

  const fullName = user.full_name || user.user_metadata?.full_name;
  if (fullName) {
    const names = fullName.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  }

  // Fallback to email initials
  if (user.email) {
    const emailName = user.email.split('@')[0];
    return emailName.substring(0, 2).toUpperCase();
  }

  return 'U';
};

export default DashboardLayout;
