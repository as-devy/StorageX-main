'use client';

import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  X
} from 'lucide-react';
import { PageType } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface Customer {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: string;
  avatar: string;
}

type ApiCustomer = Record<string, any>;

const getInitials = (name: string): string => {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  const initials = parts
    .map((part) => part.charAt(0)?.toUpperCase() ?? '')
    .join('');

  return initials || 'CU';
};

const formatStatus = (rawStatus: string | null | undefined): string => {
  if (!rawStatus) return 'Active';

  const normalized = rawStatus.replace(/_/g, ' ').trim().toLowerCase();

  if (!normalized) return 'Active';
  if (normalized === 'vip') return 'VIP';
  if (normalized === 'active') return 'Active';
  if (normalized === 'inactive') return 'Inactive';

  return normalized.replace(
    /\b\w/g,
    (char) => char.toUpperCase()
  );
};

const normalizeJoinDate = (customer: ApiCustomer): string => {
  const possibleDate =
    customer.joinDate ??
    customer.join_date ??
    customer.created_at ??
    customer.inserted_at ??
    customer.createdAt ??
    '';

  return typeof possibleDate === 'string' ? possibleDate : '';
};

const transformCustomers = (apiCustomers: ApiCustomer[]): Customer[] =>
  apiCustomers.map((customer) => {
    const name =
      customer.full_name ??
      customer.name ??
      customer.fullName ??
      customer.customer_name ??
      'Unnamed Customer';

    const status = formatStatus(customer.status);
    const joinDate = normalizeJoinDate(customer);
    const totalOrders =
      typeof customer.totalOrders === 'number'
        ? customer.totalOrders
        : typeof customer.total_orders === 'number'
          ? customer.total_orders
          : 0;
    const totalSpent =
      typeof customer.totalSpent === 'number'
        ? customer.totalSpent
        : typeof customer.total_spent === 'number'
          ? customer.total_spent
          : 0;

    return {
      id: customer.id ?? `${name}-${Math.random()}`,
      name,
      email: customer.email ?? 'N/A',
      phone: customer.phone ?? 'N/A',
      location:
        customer.location ??
        customer.city ??
        customer.region ??
        customer.shop?.name ??
        'N/A',
      joinDate,
      totalOrders,
      totalSpent,
      status,
      avatar: customer.avatar ?? getInitials(name),
    };
  });

const formatJoinDate = (value: string): string => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString();
};

const formatCurrency = (value: number): string => {
  const numeric = Number.isFinite(value) ? value : 0;
  return numeric.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

interface CustomersContentProps {
  timeFilter: string;
  onTimeFilterChange: (filter: string) => void;
  onPageChange: (page: PageType) => void;
}

const CustomersContent: React.FC<CustomersContentProps> = memo(({
  timeFilter,
  onTimeFilterChange,
  onPageChange
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive' | 'vip'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleTimeFilterChange = useCallback((period: string) => {
    onTimeFilterChange(period);
  }, [onTimeFilterChange]);

  const handlePageChange = useCallback((page: PageType) => {
    onPageChange(page);
  }, [onPageChange]);

  const handleTabChange = useCallback((tab: 'all' | 'active' | 'inactive' | 'vip') => {
    setActiveTab(tab);
  }, []);

  const [customersData, setCustomersData] = useState<Customer[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState<boolean>(true);
  const [customersError, setCustomersError] = useState<string | null>(null);

  // Add Customer Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [shops, setShops] = useState<Array<{ id: number | string; name: string }>>([]);
  const [isLoadingShops, setIsLoadingShops] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    shop_id: '',
    full_name: '',
    email: '',
    phone: '',
    location: '',
    status: 'Active'
  });

  const loadCustomers = useCallback(async (signal?: AbortSignal) => {
    setIsLoadingCustomers(true);
    setCustomersError(null);

    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

      console.log(token)

      if (!token) {
        throw new Error('Authentication token is missing. Please sign in again.');
      }

      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal
      });

      if (!response.ok) {
        let message = 'Failed to fetch customers.';
        try {
          const errorPayload = await response.json();
          if (errorPayload?.error) {
            message = errorPayload.error;
            if (errorPayload?.details) {
              message += ` (${errorPayload.details})`;
            }
          }
        } catch {
          // ignore JSON parsing issues
        }


        // If 401, suggest re-authentication
        if (response.status === 401) {
          message += ' Please sign in again.';
          // Don't automatically clear the token - let user decide
          // This prevents issues where valid tokens are removed prematurely
        }

        throw new Error(message);
      }

      const data = await response.json();
      if (signal?.aborted) return;

      const normalized = Array.isArray(data) ? transformCustomers(data) : [];
      console.log(normalized)
      setCustomersData(normalized);
    } catch (error) {
      if (signal?.aborted) return;
      const message =
        error instanceof Error ? error.message : 'Failed to fetch customers.';
      setCustomersError(message);
      setCustomersData([]);
    } finally {
      if (signal?.aborted) return;
      setIsLoadingCustomers(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadCustomers(controller.signal);
    return () => controller.abort();
  }, [loadCustomers]);

  // Fetch shops when modal opens
  const loadShops = useCallback(async () => {
    setIsLoadingShops(true);
    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

      if (!token) {
        throw new Error('Authentication token is missing.');
      }

      const response = await fetch(`${API_BASE_URL}/shops`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch shops');
      }

      const data = await response.json();
      setShops(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading shops:', error);
      setShops([]);
    } finally {
      setIsLoadingShops(false);
    }
  }, []);

  // Open modal and load shops
  const handleOpenAddModal = useCallback(() => {
    setIsAddModalOpen(true);
    setFormData({
      shop_id: '',
      full_name: '',
      email: '',
      phone: '',
      location: '',
      status: 'Active'
    });
    setSubmitError(null);
    loadShops();
  }, [loadShops]);

  // Close modal
  const handleCloseAddModal = useCallback(() => {
    setIsAddModalOpen(false);
    setSubmitError(null);
  }, []);

  // Handle form input change
  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSubmitError(null);
  }, []);

  // Handle form submission
  const handleSubmitCustomer = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!formData.shop_id || !formData.full_name) {
        throw new Error('Shop and full name are required');
      }

      const token =
        typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

      if (!token) {
        throw new Error('Authentication token is missing. Please sign in again.');
      }

      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          shop_id: formData.shop_id,
          full_name: formData.full_name,
          email: formData.email || undefined,
          phone: formData.phone || undefined,
          location: formData.location || undefined,
          status: formData.status || 'Active'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to add customer');
      }

      // Success - close modal and refresh customers
      handleCloseAddModal();
      loadCustomers();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add customer';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, loadCustomers, handleCloseAddModal]);

  // Filter customers based on active tab and search query
  const customers = useMemo(() => {
    let filtered = customersData;

    // Filter by status
    if (activeTab === 'active') {
      filtered = filtered.filter(customer => customer.status === 'Active');
    } else if (activeTab === 'inactive') {
      filtered = filtered.filter(customer => customer.status === 'Inactive');
    } else if (activeTab === 'vip') {
      filtered = filtered.filter(customer => customer.status === 'VIP');
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.location.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [customersData, activeTab, searchQuery]);

  const customerStats = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const aggregate = customersData.reduce(
      (acc, customer) => {
        acc.total += 1;
        if (customer.status === 'Active') {
          acc.active += 1;
        }

        const joinDate = customer.joinDate ? new Date(customer.joinDate) : null;
        if (
          joinDate &&
          !Number.isNaN(joinDate.getTime()) &&
          joinDate >= startOfMonth
        ) {
          acc.newThisMonth += 1;
        }

        acc.orders += customer.totalOrders;
        acc.spent += customer.totalSpent;

        return acc;
      },
      { total: 0, active: 0, newThisMonth: 0, orders: 0, spent: 0 }
    );

    const averageOrderValue =
      aggregate.orders > 0 ? aggregate.spent / aggregate.orders : 0;

    const activePercentage =
      aggregate.total > 0
        ? Math.round((aggregate.active / aggregate.total) * 100)
        : 0;

    return {
      total: aggregate.total,
      active: aggregate.active,
      newThisMonth: aggregate.newThisMonth,
      averageOrderValue,
      activePercentage,
    };
  }, [customersData]);

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 overflow-auto h-full transition-colors duration-300">
      {/* Main Content */}
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Customers</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage your customer relationships and track their activity</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Jan 20, 2023 - Feb 09, 2023</span>
              </div>
              <button
                onClick={handleOpenAddModal}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-300 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Customer</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeTab === 'all'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
            >
              All Customers
            </button>
            <button
              onClick={() => handleTabChange('active')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeTab === 'active'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
            >
              Active
            </button>
            <button
              onClick={() => handleTabChange('inactive')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeTab === 'inactive'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
            >
              Inactive
            </button>
            <button
              onClick={() => handleTabChange('vip')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeTab === 'vip'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
            >
              VIP
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Customers</div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {customerStats.total.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Across all shops</div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Customers</div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {customerStats.active.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {customerStats.activePercentage}% of total
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">New This Month</div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {customerStats.newThisMonth.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Joined since the 1st</div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Order Value</div>
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {formatCurrency(customerStats.averageOrderValue)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Based on total spend / orders</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
              />
            </div>
            <select className="text-gray-400 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>VIP</option>
            </select>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700">
                {isLoadingCustomers ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Loading customers...</p>
                      </div>
                    </td>
                  </tr>
                ) : customersError ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-red-600">
                      <div className="flex flex-col items-center space-y-4">
                        <Users className="w-12 h-12 text-red-300" />
                        <p className="text-lg font-medium">Unable to load customers</p>
                        <p className="text-sm text-red-500">{customersError}</p>
                        <button
                          onClick={() => loadCustomers()}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
                        >
                          Try again
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : customers.length > 0 ? (
                  customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 font-semibold text-sm mr-3">
                            {customer.avatar}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{customer.name}</div>
                            <div className="text-sm text-gray-500">ID: #{customer.id.toString().padStart(4, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{customer.email}</div>
                        <div className="text-sm text-gray-500">{customer.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
                          <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                          {customer.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {formatJoinDate(customer.joinDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
                          <Package className="w-4 h-4 text-gray-400 mr-1" />
                          {customer.totalOrders}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {formatCurrency(customer.totalSpent)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${customer.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : customer.status === 'VIP'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                          }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Users className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">No customers found</p>
                        <p className="text-sm">
                          {searchQuery
                            ? `No customers match "${searchQuery}"`
                            : `No ${activeTab === 'all' ? '' : activeTab} customers found`
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Add New Customer</h2>
              <button
                onClick={handleCloseAddModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCustomer} className="p-6 space-y-4">
              {submitError && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
                </div>
              )}

              {/* Shop Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Shop <span className="text-red-500">*</span>
                </label>
                {isLoadingShops ? (
                  <div className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <p className="text-sm text-gray-500">Loading shops...</p>
                  </div>
                ) : (
                  <select
                    name="shop_id"
                    value={formData.shop_id}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                  >
                    <option value="">Select a shop</option>
                    {shops.map((shop) => (
                      <option key={shop.id} value={shop.id}>
                        {shop.name}
                      </option>
                    ))}
                  </select>
                )}
                {shops.length === 0 && !isLoadingShops && (
                  <p className="text-xs text-gray-500 mt-1">No shops available. Please create a shop first.</p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleFormChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="john.doe@example.com"
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  placeholder="New York, NY"
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.shop_id || !formData.full_name}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add Customer</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});

CustomersContent.displayName = 'CustomersContent';

export default CustomersContent;
