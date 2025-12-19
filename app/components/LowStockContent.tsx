'use client';

import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  RefreshCw,
  AlertTriangle,
  Package,
  ShoppingCart,
  Filter,
  Search,
  CheckCircle,
  Clock,
  TrendingDown,
  Plus,
  Eye,
  Edit
} from 'lucide-react';

const LowStockContent: React.FC = memo(() => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleRefresh = useCallback(() => {
    alert('Refreshing low stock alerts...');
  }, []);

  const handleBulkReorder = useCallback(() => {
    if (selectedItems.length === 0) {
      alert('Please select items to reorder');
      return;
    }
    alert(`Initiating bulk reorder for ${selectedItems.length} items...`);
  }, [selectedItems]);

  const handleItemReorder = useCallback((itemId: number) => {
    alert(`Initiating reorder for item ${itemId}...`);
  }, []);

  // Mock low stock data
  const lowStockItems = useMemo(() => [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      sku: 'PWH-001',
      category: 'Audio',
      currentStock: 3,
      minThreshold: 10,
      status: 'critical',
      lastSold: '2024-01-15',
      supplier: 'AudioTech Inc.',
      reorderQuantity: 50,
      estimatedDelivery: '3-5 days'
    },
    {
      id: 2,
      name: 'Gaming Mechanical Keyboard',
      sku: 'GMK-002',
      category: 'Electronics',
      currentStock: 7,
      minThreshold: 15,
      status: 'warning',
      lastSold: '2024-01-14',
      supplier: 'TechGear Ltd.',
      reorderQuantity: 30,
      estimatedDelivery: '2-4 days'
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      sku: 'BTS-003',
      category: 'Audio',
      currentStock: 2,
      minThreshold: 8,
      status: 'critical',
      lastSold: '2024-01-13',
      supplier: 'SoundWave Co.',
      reorderQuantity: 25,
      estimatedDelivery: '5-7 days'
    },
    {
      id: 4,
      name: 'USB-C Cable',
      sku: 'UCC-004',
      category: 'Accessories',
      currentStock: 12,
      minThreshold: 20,
      status: 'warning',
      lastSold: '2024-01-12',
      supplier: 'CablePro Inc.',
      reorderQuantity: 100,
      estimatedDelivery: '1-2 days'
    },
    {
      id: 5,
      name: 'Wireless Mouse',
      sku: 'WM-005',
      category: 'Electronics',
      currentStock: 1,
      minThreshold: 12,
      status: 'critical',
      lastSold: '2024-01-11',
      supplier: 'MouseTech Ltd.',
      reorderQuantity: 40,
      estimatedDelivery: '4-6 days'
    }
  ], []);

  const filteredItems = lowStockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const criticalItems = lowStockItems.filter(item => item.status === 'critical').length;
  const warningItems = lowStockItems.filter(item => item.status === 'warning').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <Clock className="w-4 h-4 text-orange-600" />;
      default:
        return <Package className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 overflow-auto h-full transition-colors duration-300">
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Low Stock Alerts</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Items that need immediate attention</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleRefresh}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button 
                onClick={handleBulkReorder}
                className="bg-brand-main text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors duration-300 flex items-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Bulk Reorder</span>
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Items</div>
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{criticalItems}</div>
              <div className="text-sm text-red-600">Need immediate attention</div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Warning Items</div>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{warningItems}</div>
              <div className="text-sm text-orange-600">Should reorder soon</div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Alerts</div>
                <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-brand-main" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{lowStockItems.length}</div>
              <div className="text-sm text-brand-main">Items need attention</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-main/20 focus:border-brand-main/50"
                />
              </div>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-main/20 focus:border-brand-main/50"
              >
                <option value="all">All Status</option>
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
              </select>
            </div>
          </div>
        </div>

        {/* Low Stock Items Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(filteredItems.map(item => item.id));
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sold</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems(prev => [...prev, item.id]);
                          } else {
                            setSelectedItems(prev => prev.filter(id => id !== item.id));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.sku} • {item.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 text-gray-400 mr-1" />
                        <span className={`text-sm font-medium ${
                          item.currentStock <= 3 ? 'text-red-600' : 'text-orange-600'
                        }`}>
                          {item.currentStock}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">units</span>
                      </div>
                      <div className="text-xs text-gray-500">Min: {item.minThreshold}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(item.status)}
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {item.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {new Date(item.lastSold).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleItemReorder(item.id)}
                          className="text-brand-main hover:text-brand-third"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No low stock items found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
});

LowStockContent.displayName = 'LowStockContent';

export default LowStockContent;