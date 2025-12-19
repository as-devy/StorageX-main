'use client';

import React, { memo, useCallback, useMemo, useState, useEffect } from 'react';
import {
  ShoppingCart,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  X,
  DollarSign,
  Calendar,
  User,
  MapPin,
  Plus,
  AlertTriangle
} from 'lucide-react';
import { PageType } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface OrdersContentProps {
  timeFilter: string;
  onTimeFilterChange: (filter: string) => void;
  onPageChange: (page: PageType) => void;
}

const OrdersContent: React.FC<OrdersContentProps> = memo(({
  timeFilter,
  onTimeFilterChange,
  onPageChange
}) => {
  // Reusable style classes for modal inputs and buttons (customizable)
  const inputClass = "w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50";
  const textareaClass = inputClass + " resize-none";
  const selectClass = inputClass;
  const primaryButtonClass = "px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";
  const secondaryButtonClass = "px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50";
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered'>('all');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  // Add Order Modal State
  const [isAddOrderOpen, setIsAddOrderOpen] = useState<boolean>(false);
  const [isAddSubmitting, setIsAddSubmitting] = useState<boolean>(false);
  const [addSubmitError, setAddSubmitError] = useState<string | null>(null);
  const [addFormData, setAddFormData] = useState({
    shop_id: '',
    customer_id: '',
    order_number: '',
    item_count: '',
    total_amount: '',
    status: 'Pending',
    shipping_address: '',
    tracking_number: ''
  });

  // Edit Order Modal State
  const [isEditOrderOpen, setIsEditOrderOpen] = useState<boolean>(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [isEditOrderSubmitting, setIsEditOrderSubmitting] = useState<boolean>(false);
  const [editOrderError, setEditOrderError] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    shop_id: '',
    customer_id: '',
    order_number: '',
    item_count: '',
    total_amount: '',
    status: '',
    shipping_address: '',
    tracking_number: ''
  });

  const loadOrders = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

      if (!token) {
        throw new Error('Authentication token is missing. Please sign in again.');
      }

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal
      });

      if (!response.ok) {
        let message = 'Failed to fetch orders.';
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

        if (response.status === 401) {
          message += ' Please sign in again.';
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
          }
        }

        throw new Error(message);
      }

      const data = await response.json();
      if (signal?.aborted) return;

      // Transform API data to match component requirements
      const transformedOrders = (Array.isArray(data) ? data : []).map((order: any) => ({
        id: order.id,
        orderNumber: order.order_number || `ORD-${order.id}`,
        customer: order.customer?.full_name || 'Unknown Customer',
        email: order.customer?.email || 'N/A',
        shop: order.shop?.name || 'Unknown Shop',
        items: order.item_count || 0,
        total: order.total_amount || 0,
        status: order.status || 'Pending',
        orderDate: order.created_at || new Date().toISOString(),
        shipDate: order.shipped_at || null,
        trackingNumber: order.tracking_number || null,
        shippingAddress: order.shipping_address || '-',
        rawData: order
      }));

      setOrders(transformedOrders);
    } catch (err: any) {
      if (signal?.aborted) return;
      setError(err.message || 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
      setOrders([]);
    } finally {
      if (signal?.aborted) return;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadOrders(controller.signal);
    return () => controller.abort();
  }, [loadOrders]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Shipped':
        return <Truck className="w-4 h-4 text-brand-main" />;
      case 'Processing':
        return <Package className="w-4 h-4 text-orange-600" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-brand-100 text-brand-800';
      case 'Processing':
        return 'bg-orange-100 text-orange-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter orders based on active tab and search query
  const filteredOrders = useMemo(() => {
    let filtered = orders;

    if (activeTab !== 'all') {
      filtered = filtered.filter(order => order.status.toLowerCase() === activeTab.toLowerCase());
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query) ||
        order.trackingNumber?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [orders, activeTab, searchQuery]);

  // Calculate KPI metrics
  const kpiMetrics = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'Pending').length;
    const shipped = orders.filter(o => o.status === 'Shipped').length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

    return { total, pending, shipped, totalRevenue };
  }, [orders]);

  const handleTimeFilterChange = useCallback((period: string) => {
    onTimeFilterChange(period);
  }, [onTimeFilterChange]);

  const handlePageChange = useCallback((page: PageType) => {
    onPageChange(page);
  }, [onPageChange]);

  const handleTabChange = useCallback((tab: 'all' | 'pending' | 'processing' | 'shipped' | 'delivered') => {
    setActiveTab(tab);
  }, []);

  const handleOpenOrderModal = useCallback((order: any) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  }, []);

  const handleCloseOrderModal = useCallback(() => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  }, []);

  // Add Order handlers
  const handleOpenAddOrder = useCallback(() => {
    setIsAddOrderOpen(true);
    setAddSubmitError(null);
    setAddFormData({ shop_id: '', customer_id: '', order_number: '', item_count: '', total_amount: '', status: 'Pending', shipping_address: '', tracking_number: '' });
  }, []);

  const handleCloseAddOrder = useCallback(() => {
    setIsAddOrderOpen(false);
    setAddSubmitError(null);
    setAddFormData({ shop_id: '', customer_id: '', order_number: '', item_count: '', total_amount: '', status: 'Pending', shipping_address: '', tracking_number: '' });
  }, []);

  const handleAddFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddFormData(prev => ({ ...prev, [name]: value }));
    setAddSubmitError(null);
  }, []);

  const handleSubmitAddOrder = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddSubmitting(true);
    setAddSubmitError(null);

    try {
      if (!addFormData.shop_id || !addFormData.customer_id || !addFormData.order_number) {
        throw new Error('Shop ID, Customer ID and Order Number are required');
      }

      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (!token) throw new Error('Authentication token is missing. Please sign in again.');

      const body = {
        shop_id: addFormData.shop_id,
        customer_id: addFormData.customer_id,
        order_number: addFormData.order_number,
        item_count: addFormData.item_count ? parseInt(addFormData.item_count, 10) : 0,
        total_amount: addFormData.total_amount ? parseFloat(addFormData.total_amount) : 0,
        status: addFormData.status || 'Pending',
        shipping_address: addFormData.shipping_address || undefined,
        tracking_number: addFormData.tracking_number || undefined
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create order');
      }

      handleCloseAddOrder();
      loadOrders();
    } catch (err: any) {
      setAddSubmitError(err.message || 'Failed to add order');
    } finally {
      setIsAddSubmitting(false);
    }
  }, [addFormData, loadOrders, handleCloseAddOrder]);

  // Validate required fields for Add Order form
  const isAddFormValid = useMemo(() => {
    const shopOk = typeof addFormData.shop_id === 'string' && addFormData.shop_id.trim().length > 0;
    const customerOk = typeof addFormData.customer_id === 'string' && addFormData.customer_id.trim().length > 0;
    const orderOk = typeof addFormData.order_number === 'string' && addFormData.order_number.trim().length > 0;
    return shopOk && customerOk && orderOk;
  }, [addFormData]);

  // Edit Order handlers
  const handleOpenEditOrder = useCallback((order: any) => {
    setEditingOrder(order);
    setEditFormData({
      shop_id: order.rawData?.shop_id ?? '',
      customer_id: order.rawData?.customer_id ?? '',
      order_number: order.orderNumber ?? '',
      item_count: order.items?.toString() ?? '',
      total_amount: order.total?.toString() ?? '',
      status: order.status ?? 'Pending',
      shipping_address: order.rawData?.shipping_address ?? order.shippingAddress ?? '',
      tracking_number: order.rawData?.tracking_number ?? order.trackingNumber ?? ''
    });
    setIsEditOrderOpen(true);
    setEditOrderError(null);
  }, []);

  const handleCloseEditOrder = useCallback(() => {
    setIsEditOrderOpen(false);
    setEditingOrder(null);
    setEditOrderError(null);
    setEditFormData({ shop_id: '', customer_id: '', order_number: '', item_count: '', total_amount: '', status: '', shipping_address: '', tracking_number: '' });
  }, []);

  const handleEditFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
    setEditOrderError(null);
  }, []);

  const handleSubmitEditOrder = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    setIsEditOrderSubmitting(true);
    setEditOrderError(null);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (!token) throw new Error('Authentication token is missing. Please sign in again.');

      const body: any = {};
      if (editFormData.order_number) body.order_number = editFormData.order_number;
      if (editFormData.item_count) body.item_count = parseInt(editFormData.item_count, 10);
      if (editFormData.total_amount) body.total_amount = parseFloat(editFormData.total_amount);
      if (editFormData.status) body.status = editFormData.status;
      if (editFormData.shipping_address) body.shipping_address = editFormData.shipping_address;
      if (editFormData.tracking_number) body.tracking_number = editFormData.tracking_number;

      const response = await fetch(`${API_BASE_URL}/orders/${editingOrder.id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update order');
      }

      handleCloseEditOrder();
      loadOrders();
    } catch (err: any) {
      setEditOrderError(err.message || 'Failed to update order');
    } finally {
      setIsEditOrderSubmitting(false);
    }
  }, [editFormData, editingOrder, loadOrders, handleCloseEditOrder]);

  if (loading) {
    return (
      <div className="flex-1 bg-white dark:bg-gray-900 overflow-auto h-full flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-main mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-white dark:bg-gray-900 overflow-auto h-full flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 font-semibold mb-2">Error loading orders</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{error}</p>
          <button
            onClick={() => loadOrders()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 overflow-auto h-full transition-colors duration-300">
      {/* Main Content */}
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Orders</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Track and manage customer orders</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Jan 20, 2023 - Feb 09, 2023</span>
              </div>
              <button
                onClick={handleOpenAddOrder}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-300 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Order</span>
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
              All Orders
            </button>
            <button
              onClick={() => handleTabChange('pending')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeTab === 'pending'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
            >
              Pending
            </button>
            <button
              onClick={() => handleTabChange('processing')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeTab === 'processing'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
            >
              Processing
            </button>
            <button
              onClick={() => handleTabChange('shipped')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeTab === 'shipped'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
            >
              Shipped
            </button>
            <button
              onClick={() => handleTabChange('delivered')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeTab === 'delivered'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
            >
              Delivered
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</div>
              <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-brand-main" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{kpiMetrics.total}</div>
            <div className="text-sm text-green-600">All orders from owner</div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Orders</div>
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{kpiMetrics.pending}</div>
            <div className="text-sm text-yellow-600">Awaiting processing</div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Shipped</div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Truck className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{kpiMetrics.shipped}</div>
            <div className="text-sm text-green-600">Out for delivery</div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              ${(kpiMetrics.totalRevenue / 1000).toFixed(1)}K
            </div>
            <div className="text-sm text-green-600">Total from all orders</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-main/20 focus:border-brand-main/50"
              />
            </div>
            <select className="text-gray-400 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-main/20 focus:border-brand-main/50">
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
            <button
              onClick={() => alert('Opening advanced filters...')}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{order.orderNumber}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{order.customer}</div>
                            <div className="text-sm text-gray-500">{order.shop}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
                          <Package className="w-4 h-4 text-gray-400 mr-1" />
                          {order.items} item{order.items !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(order.status)}
                          <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.trackingNumber ? (
                          <div className="text-sm text-brand-main dark:text-brand-300 font-mono">{order.trackingNumber}</div>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleOpenOrderModal(order)}
                            className="text-brand-main dark:text-brand-300 hover:text-brand-third dark:hover:text-brand-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEditOrder(order)}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center">
                      <p className="text-gray-600 dark:text-gray-400">No orders found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Add Order Modal */}
        {isAddOrderOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Add Order</h2>
                <button
                  onClick={handleCloseAddOrder}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitAddOrder} className="p-6 space-y-4">
                {addSubmitError && (
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400">{addSubmitError}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shop ID <span className="text-red-500">*</span></label>
                  <input name="shop_id" value={addFormData.shop_id} onChange={handleAddFormChange} required className={inputClass} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Customer ID <span className="text-red-500">*</span></label>
                  <input name="customer_id" value={addFormData.customer_id} onChange={handleAddFormChange} required className={inputClass} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order Number <span className="text-red-500">*</span></label>
                  <input name="order_number" value={addFormData.order_number} onChange={handleAddFormChange} required className={inputClass} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Item Count</label>
                    <input name="item_count" value={addFormData.item_count} onChange={handleAddFormChange} type="number" min="0" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Amount</label>
                    <input name="total_amount" value={addFormData.total_amount} onChange={handleAddFormChange} type="number" step="0.01" min="0" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select name="status" value={addFormData.status} onChange={handleAddFormChange} className={selectClass}>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shipping Address</label>
                  <textarea name="shipping_address" value={addFormData.shipping_address} onChange={handleAddFormChange} rows={2} className={textareaClass} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tracking Number</label>
                  <input name="tracking_number" value={addFormData.tracking_number} onChange={handleAddFormChange} className={inputClass} />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                  <button type="button" onClick={handleCloseAddOrder} disabled={isAddSubmitting} className={secondaryButtonClass}>Cancel</button>
                  <button
                    type="submit"
                    disabled={!isAddFormValid || isAddSubmitting}
                    title={!isAddFormValid ? 'Please fill required fields' : undefined}
                    className={`${primaryButtonClass} ${(!isAddFormValid || isAddSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isAddSubmitting ? 'Adding...' : 'Add Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Order Modal */}
        {isEditOrderOpen && editingOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Edit Order</h2>
                <button onClick={handleCloseEditOrder} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSubmitEditOrder} className="p-6 space-y-4">
                {editOrderError && (<div className="p-3 rounded bg-red-50 text-red-600">{editOrderError}</div>)}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order Number</label>
                  <input name="order_number" value={editFormData.order_number} onChange={handleEditFormChange} className={inputClass} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Item Count</label>
                    <input name="item_count" value={editFormData.item_count} onChange={handleEditFormChange} type="number" min="0" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Amount</label>
                    <input name="total_amount" value={editFormData.total_amount} onChange={handleEditFormChange} type="number" step="0.01" min="0" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select name="status" value={editFormData.status} onChange={handleEditFormChange} className={selectClass}>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shipping Address</label>
                  <textarea name="shipping_address" value={editFormData.shipping_address} onChange={handleEditFormChange} rows={2} className={textareaClass} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tracking Number</label>
                  <input name="tracking_number" value={editFormData.tracking_number} onChange={handleEditFormChange} className={inputClass} />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                  <button type="button" onClick={handleCloseEditOrder} disabled={isEditOrderSubmitting} className={secondaryButtonClass}>Cancel</button>
                  <button type="submit" disabled={isEditOrderSubmitting} className={primaryButtonClass}>{isEditOrderSubmitting ? 'Saving...' : 'Save Changes'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Order Detail Modal */}
        {isOrderModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Order Details</h2>
                <button
                  onClick={handleCloseOrderModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Order</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedOrder.orderNumber}</div>
                    <div className="text-sm text-gray-500">{selectedOrder.shop}</div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">{new Date(selectedOrder.orderDate).toLocaleString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Customer</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{selectedOrder.customer}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.email}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Items</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{selectedOrder.items} item{selectedOrder.items !== 1 ? 's' : ''}</p>
                    <p className="text-sm text-gray-500 mt-1">Total: <span className="font-medium">${selectedOrder.total.toFixed(2)}</span></p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Shipping</p>
                  <div className="mt-2 text-sm text-gray-900 dark:text-gray-100">
                    <div className="font-medium">{selectedOrder.shippingAddress || '-'}</div>
                    <div className="text-sm text-gray-500 mt-1">Tracking: {selectedOrder.trackingNumber || '-'}</div>
                    <div className="text-sm text-gray-500">Shipped: {selectedOrder.shipDate ? new Date(selectedOrder.shipDate).toLocaleString() : '-'}</div>
                  </div>
                </div>

                {/* raw data removed from UI to keep modal concise */}

                <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleCloseOrderModal}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
});

OrdersContent.displayName = 'OrdersContent';

export default OrdersContent;
