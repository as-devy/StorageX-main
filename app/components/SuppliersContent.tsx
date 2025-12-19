'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Search, Plus, MoreVertical, Star, MapPin, Phone, Mail, ExternalLink, AlertTriangle, X, Eye, Trash2 } from 'lucide-react';
import { PageType } from '../types';

interface SuppliersContentProps {
  timeFilter: string;
  onTimeFilterChange: (filter: string) => void;
  onPageChange: (page: PageType) => void;
}

const SuppliersContent: React.FC<SuppliersContentProps> = ({ timeFilter, onTimeFilterChange, onPageChange }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'top-rated' | 'categories'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [fetchedSuppliers, setFetchedSuppliers] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [supplierToDelete, setSupplierToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const handlePageChange = useCallback((page: PageType) => {
    onPageChange(page);
  }, [onPageChange]);

  // `sourceSuppliers` is the authoritative supplier list used by the UI.
  // Prefer the fetched suppliers from the API; if not available yet, use an empty list.
  const sourceSuppliers = useMemo(() => (Array.isArray(fetchedSuppliers) ? fetchedSuppliers : []), [fetchedSuppliers]);

  // Modal / form state for adding a supplier
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [newSupplier, setNewSupplier] = useState<any>({
    name: '',
    category: '',
    status: 'active',
    rating: 4.5,
    location: '',
    phone: '',
    email: '',
    website: ''
  });

  // Reusable input/button classes so styling is consistent with other components
  const inputClass = 'w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-main';
  const selectClass = inputClass;
  const primaryButtonClass = 'px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md text-sm font-medium transition-colors';
  const secondaryButtonClass = 'px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 text-sm rounded-md';

  const suppliers = useMemo(() => {
    // prefer fetched suppliers when available
    let base = sourceSuppliers;
    let filtered = base;

    // Filter by tab
    if (activeTab === 'active') {
      filtered = filtered.filter(supplier => supplier.status === 'active');
    } else if (activeTab === 'top-rated') {
      filtered = filtered.filter(supplier => supplier.rating >= 4.5);
    } else if (activeTab === 'categories') {
      // Group by categories for this view
      return filtered;
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(supplier =>
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [sourceSuppliers, activeTab, searchQuery]);

  // Fetch suppliers from API (owner scoped) on mount
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(`${API_BASE_URL}/suppliers`, { method: 'GET', headers, signal: controller.signal });
        if (!res.ok) {
          const payload = await res.json().catch(() => ({}));
          throw new Error(payload.error || `Failed to fetch suppliers (${res.status})`);
        }
        const data = await res.json();
        if (controller.signal.aborted) return;

        // Map API supplier objects into UI shape with safe fallbacks
        const mapped = (Array.isArray(data) ? data : []).map((s: any) => ({
          id: s.id,
          name: s.name || s.company_name || s.full_name || 'Unnamed Supplier',
          category: s.category || 'General',
          status: s.status || 'active',
          rating: typeof s.rating === 'number' ? s.rating : (s.score || 4.5),
          location: s.location || s.city || s.address || 'Unknown',
          phone: s.phone || s.telephone || '-',
          email: s.email || s.contact_email || '-',
          website: s.website || s.url || '-',
          lastOrder: s.last_order || s.lastOrder || '-',
          totalOrders: s.total_orders || s.totalOrders || 0,
          avgDeliveryTime: s.avg_delivery_time || s.avgDeliveryTime || '-',
        }));

        setFetchedSuppliers(mapped);
      } catch (err: any) {
        if (controller.signal.aborted) return;
        setFetchError(err.message || 'Failed to fetch suppliers');
        setFetchedSuppliers([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-yellow-500 dark:text-yellow-400';
    if (rating >= 4.0) return 'text-orange-500 dark:text-orange-400';
    return 'text-gray-500 dark:text-gray-400';
  };

  // Handlers for Add Supplier form
  const handleNewChange = (field: string, value: any) => {
    setNewSupplier((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmitNewSupplier = async (e?: React.FormEvent) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const body = {
        name: newSupplier.name,
        category: newSupplier.category,
        status: newSupplier.status,
        rating: Number(newSupplier.rating),
        location: newSupplier.location,
        phone: newSupplier.phone,
        email: newSupplier.email,
        website: newSupplier.website,
      };

      const res = await fetch(`${API_BASE_URL}/suppliers`, { method: 'POST', headers, body: JSON.stringify(body) });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || `Failed to create supplier (${res.status})`);
      }
      const created = await res.json();

      // Map created supplier into UI shape (reusing same mapping as fetch)
      const mapped = {
        id: created.id,
        name: created.name || created.company_name || created.full_name || body.name || 'Unnamed Supplier',
        category: created.category || body.category || 'General',
        status: created.status || body.status || 'active',
        rating: typeof created.rating === 'number' ? created.rating : (created.score || body.rating || 4.5),
        location: created.location || created.city || created.address || body.location || 'Unknown',
        phone: created.phone || created.telephone || body.phone || '-',
        email: created.email || created.contact_email || body.email || '-',
        website: created.website || created.url || body.website || '-',
        lastOrder: created.last_order || created.lastOrder || '-',
        totalOrders: created.total_orders || created.totalOrders || 0,
        avgDeliveryTime: created.avg_delivery_time || created.avgDeliveryTime || '-',
      };

      // Add to top of fetched list
      setFetchedSuppliers((prev: any[] | null) => (Array.isArray(prev) ? [mapped, ...prev] : [mapped]));
      // Reset and close
      setNewSupplier({ name: '', category: '', status: 'active', rating: 4.5, location: '', phone: '', email: '', website: '' });
      setIsAddOpen(false);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to create supplier');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Basic client-side validation: require name and email
  const isAddFormValid = useMemo(() => {
    const nameOk = typeof newSupplier.name === 'string' && newSupplier.name.trim().length > 0;
    const emailOk = typeof newSupplier.email === 'string' && newSupplier.email.trim().length > 0;
    return nameOk && emailOk;
  }, [newSupplier]);

  // Delete supplier handler
  const handleDeleteSupplier = useCallback(async (supplierId: string, supplierName: string) => {
    if (!confirm(`Are you sure you want to delete "${supplierName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (!token) throw new Error('Authentication token is missing');

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/suppliers/${supplierId}`, { method: 'DELETE', headers });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || `Failed to delete supplier (${res.status})`);
      }

      // Remove supplier from fetched list
      setFetchedSuppliers((prev: any[] | null) => (Array.isArray(prev) ? prev.filter(s => s.id !== supplierId) : null));
    } catch (err: any) {
      alert(`Error deleting supplier: ${err.message || 'Unknown error'}`);
    }
  }, []);

  // Open delete confirmation modal
  const handleOpenDeleteModal = useCallback((supplier: any) => {
    setSupplierToDelete(supplier);
    setIsDeleteModalOpen(true);
  }, []);

  // Close delete modal
  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSupplierToDelete(null);
  }, []);

  // Confirm and execute delete
  const handleConfirmDelete = useCallback(async () => {
    if (!supplierToDelete) return;
    setIsDeleting(true);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (!token) throw new Error('Authentication token is missing');

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/suppliers/${supplierToDelete.id}`, { method: 'DELETE', headers });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || `Failed to delete supplier (${res.status})`);
      }

      // Remove supplier from fetched list
      setFetchedSuppliers((prev: any[] | null) => (Array.isArray(prev) ? prev.filter(s => s.id !== supplierToDelete.id) : null));
      handleCloseDeleteModal();
    } catch (err: any) {
      alert(`Error deleting supplier: ${err.message || 'Unknown error'}`);
    } finally {
      setIsDeleting(false);
    }
  }, [supplierToDelete, handleCloseDeleteModal]);

  if (loading) {
    return (
      <div className="flex-1 bg-white dark:bg-gray-900 overflow-auto h-full flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-main mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading suppliers...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex-1 bg-white dark:bg-gray-900 overflow-auto h-full flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 font-semibold mb-2">Error loading suppliers</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{fetchError}</p>
          <button
            onClick={() => {
              setFetchedSuppliers(null);
              setLoading(true);
              setFetchError(null);
              // re-run effect by setting fetchedSuppliers to null and letting useEffect run only once on mount
              // to trigger a reload now we'll call the fetch directly
              (async () => {
                try {
                  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
                  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
                  if (token) headers.Authorization = `Bearer ${token}`;
                  const res = await fetch(`${API_BASE_URL}/suppliers`, { method: 'GET', headers });
                  if (!res.ok) throw new Error('Failed to fetch suppliers');
                  const data = await res.json();
                  const mapped = (Array.isArray(data) ? data : []).map((s: any) => ({
                    id: s.id,
                    name: s.name || s.company_name || s.full_name || 'Unnamed Supplier',
                    category: s.category || 'General',
                    status: s.status || 'active',
                    rating: typeof s.rating === 'number' ? s.rating : (s.score || 4.5),
                    location: s.location || s.city || s.address || 'Unknown',
                    phone: s.phone || s.telephone || '-',
                    email: s.email || s.contact_email || '-',
                    website: s.website || s.url || '-',
                    lastOrder: s.last_order || s.lastOrder || '-',
                    totalOrders: s.total_orders || s.totalOrders || 0,
                    avgDeliveryTime: s.avg_delivery_time || s.avgDeliveryTime || '-',
                  }));
                  setFetchedSuppliers(mapped);
                  setFetchError(null);
                } catch (err: any) {
                  setFetchError(err.message || 'Failed to fetch suppliers');
                } finally {
                  setLoading(false);
                }
              })();
            }}
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Suppliers</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAddOpen(true)}
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
              >
                <Plus className="w-4 h-4 mr-2 inline" />
                Add Supplier
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              All Suppliers
            </button>
            <button 
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'active' 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Active
            </button>
            <button 
              onClick={() => setActiveTab('top-rated')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'top-rated' 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Top Rated
            </button>
            <button 
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'categories' 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Categories
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-main focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Content */}
        {activeTab === 'categories' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Electronics', 'Apparel', 'Home & Garden', 'Sports & Recreation', 'Health & Beauty'].map((category) => {
              const categorySuppliers = sourceSuppliers.filter(s => s.category === category);
              return (
                <div key={category} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{category}</h3>
                  <div className="space-y-3">
                    {categorySuppliers.map((supplier) => (
                      <div key={supplier.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{supplier.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{supplier.location}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(supplier.status)}`}>
                            {supplier.status}
                          </div>
                          <div className="flex items-center">
                            <Star className={`w-4 h-4 ${getRatingColor(supplier.rating)}`} />
                            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{supplier.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-colors duration-300">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {suppliers.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{supplier.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{supplier.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{supplier.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(supplier.status)}`}>
                          {supplier.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className={`w-4 h-4 ${getRatingColor(supplier.rating)}`} />
                          <span className="text-sm text-gray-900 dark:text-gray-100 ml-1">{supplier.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400 dark:text-gray-500" />
                          {supplier.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {supplier.lastOrder}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => { setSelectedSupplier(supplier); setIsDetailOpen(true); }}
                            className="text-brand-main hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => { if (supplier.phone && supplier.phone !== '-') window.location.href = `tel:${supplier.phone}`; }}
                            title={supplier.phone && supplier.phone !== '-' ? `Call ${supplier.phone}` : 'No phone number'}
                            disabled={!supplier.phone || supplier.phone === '-'}
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => { if (supplier.email && supplier.email !== '-') window.location.href = `mailto:${supplier.email}`; }}
                            title={supplier.email && supplier.email !== '-' ? `Email ${supplier.email}` : 'No email address'}
                            disabled={!supplier.email || supplier.email === '-'}
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(supplier)}
                            title="Delete supplier"
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {suppliers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg">No suppliers found</div>
            <div className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adjusting your search or filters</div>
          </div>
        )}
        {/* Add Supplier Modal */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => { if (!isSubmitting) setIsAddOpen(false); }} />
            <div className="relative w-full max-w-xl mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <form onSubmit={handleSubmitNewSupplier} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add Supplier</h2>
                  <button type="button" onClick={() => setIsAddOpen(false)} className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Name</label>
                    <input className={inputClass} value={newSupplier.name} onChange={(e) => handleNewChange('name', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Category</label>
                    <input className={inputClass} value={newSupplier.category} onChange={(e) => handleNewChange('category', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Status</label>
                    <select className={selectClass} value={newSupplier.status} onChange={(e) => handleNewChange('status', e.target.value)}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Rating</label>
                    <input type="number" step="0.1" min="0" max="5" className={inputClass} value={newSupplier.rating} onChange={(e) => handleNewChange('rating', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Location</label>
                    <input className={inputClass} value={newSupplier.location} onChange={(e) => handleNewChange('location', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Phone</label>
                    <input className={inputClass} value={newSupplier.phone} onChange={(e) => handleNewChange('phone', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Email</label>
                    <input type="email" className={inputClass} value={newSupplier.email} onChange={(e) => handleNewChange('email', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Website</label>
                    <input className={inputClass} value={newSupplier.website} onChange={(e) => handleNewChange('website', e.target.value)} />
                  </div>
                </div>

                {submitError && <div className="text-sm text-red-600 mt-3">{submitError}</div>}

                <div className="mt-6 flex justify-end space-x-3">
                  <button type="button" disabled={isSubmitting} onClick={() => setIsAddOpen(false)} className={secondaryButtonClass}>Cancel</button>
                  <button
                    type="submit"
                    disabled={!isAddFormValid || isSubmitting}
                    title={!isAddFormValid ? 'Please fill required fields' : undefined}
                    className={`${primaryButtonClass} ${(!isAddFormValid || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Supplier'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Supplier Detail Modal */}
        {isDetailOpen && selectedSupplier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsDetailOpen(false)} />
            <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedSupplier.name}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedSupplier.category}</p>
                  </div>
                  <button type="button" onClick={() => setIsDetailOpen(false)} className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">Status</p>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedSupplier.status)}`}>
                      {selectedSupplier.status}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">Rating</p>
                    <div className="flex items-center">
                      <Star className={`w-5 h-5 ${getRatingColor(selectedSupplier.rating)}`} />
                      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 ml-2">{selectedSupplier.rating}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">Location</p>
                    <div className="flex items-start mt-2">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-900 dark:text-gray-100">{selectedSupplier.location}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">Contact</p>
                    <p className="text-sm text-gray-900 dark:text-gray-100 mb-1">{selectedSupplier.phone}</p>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{selectedSupplier.email}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg md:col-span-2">
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">Website</p>
                    <a href={selectedSupplier.website} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-main hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200 break-all">
                      {selectedSupplier.website !== '-' ? selectedSupplier.website : 'Not provided'}
                    </a>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedSupplier.totalOrders}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">Avg Delivery Time</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedSupplier.avgDeliveryTime}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg md:col-span-2">
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">Last Order</p>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{selectedSupplier.lastOrder !== '-' ? selectedSupplier.lastOrder : 'No orders yet'}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsDetailOpen(false)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && supplierToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => !isDeleting && handleCloseDeleteModal()} />
            <div className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                  <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Delete Supplier</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Are you sure you want to delete <strong>{supplierToDelete.name}</strong>? This action cannot be undone.
                </p>

                <div className="flex flex-col-reverse sm:flex-row justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleCloseDeleteModal}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuppliersContent;