'use client';

import React, { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  DollarSign,
  Loader2,
  Package,
  Tag,
  Boxes
} from 'lucide-react';
import AuthShield from '../../components/AuthShield';
// import Barcode from 'react-barcode';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  lowStockThreshold: number;
  status: string;
  description?: string;
  image?: string;
  lastUpdated?: string;
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [productViewOrigin, setProductViewOrigin] = useState<string>(
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || ''
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProductViewOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (!productId) return;

    const controller = new AbortController();

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const token =
          typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

        if (!token) {
          throw new Error('Authentication token is missing. Please sign in again.');
        }

        const fetchUrl = `${API_BASE_URL}/products/${productId}`;
        console.log('📍 Fetching product from:', fetchUrl);

        const response = await fetch(fetchUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          signal: controller.signal
        });

        console.log('📍 Response status:', response.status);

        if (!response.ok) {
          let message = 'Failed to fetch product.';
          try {
            const payload = await response.json();
            console.log('📍 Error payload:', payload);
            if (payload?.error) {
              message = payload.error;
              if (payload?.details) {
                message += ` (${payload.details})`;
              }
            }
          } catch {
            // Ignore JSON parsing issues
          }

          if (response.status === 404) {
            message = 'Product not found.';
          }

          if (response.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            message += ' Please sign in again.';
          }

          throw new Error(message);
        }

        const data = await response.json();
        console.log('✅ Product data received:', data);
        if (controller.signal.aborted) return;

        const transformed: Product = {
          id: data.id,
          name: data.name || 'Unnamed Product',
          sku: data.sku || `SKU-${data.id}`,
          category: data.category || 'Uncategorized',
          price: data.price || 0,
          cost: data.cost || 0,
          stock: data.stock || 0,
          lowStockThreshold: data.low_stock_threshold || 10,
          status:
            data.stock === 0
              ? 'Out of Stock'
              : data.stock <= (data.low_stock_threshold || 10)
                ? 'Low Stock'
                : 'Active',
          description: data.description,
          image: data.image || '📦',
          lastUpdated: data.updated_at || data.created_at
        };

        setProduct(transformed);
      } catch (err: any) {
        if (controller.signal.aborted) return;
        setError(err?.message || 'Failed to load product');
        setProduct(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();
    return () => controller.abort();
  }, [productId]);

  const productViewUrl = useMemo(() => {
    if (!product) return '';
    const path = `/products/${product.id}`;
    return productViewOrigin ? `${productViewOrigin}${path}` : path;
  }, [product, productViewOrigin]);

  const renderStatusBadge = (status: string) => {
    const statusStyles =
      status === 'Active'
        ? 'bg-green-100 text-green-800'
        : status === 'Low Stock'
          ? 'bg-orange-100 text-orange-800'
          : 'bg-red-100 text-red-800';

    return (
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles}`}>
        {status}
      </span>
    );
  };

  return (
    <AuthShield>
      <div className="min-h-screen bg-gray-50 py-10 px-4 dark:bg-gray-950">
        <div className="mx-auto flex max-w-5xl flex-col space-y-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>
            <Link
              href="/"
              className="text-sm font-medium text-brand-main hover:text-brand-third"
            >
              Go to dashboard
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            {loading && (
              <div className="flex h-60 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-brand-main" />
              </div>
            )}

            {!loading && error && (
              <div className="p-10 text-center">
                <AlertTriangle className="mx-auto mb-4 h-10 w-10 text-red-500" />
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{error}</p>
                <button
                  type="button"
                  onClick={() => router.refresh()}
                  className="mt-4 inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && product && (
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <div className="flex flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-2xl dark:bg-gray-800">
                      {product.image}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{product.name}</h1>
                      <p className="text-sm text-gray-500 dark:text-gray-400">SKU: {product.sku}</p>
                    </div>
                  </div>
                  {renderStatusBadge(product.status)}
                </div>

                <div className="grid gap-6 p-8 md:grid-cols-2">
                  <div className="rounded-2xl border border-gray-100 p-6 dark:border-gray-800">
                    <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-wide">Pricing</span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Price</div>
                      <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        {currencyFormatter.format(product.price)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Cost</div>
                      <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {currencyFormatter.format(product.cost)}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-100 p-6 dark:border-gray-800">
                    <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                      <Boxes className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-wide">Inventory</span>
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="text-4xl font-semibold text-gray-900 dark:text-gray-100">
                        {product.stock} <span className="text-lg font-medium text-gray-500">units</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Threshold: {product.lowStockThreshold} units
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Category: {product.category}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 p-8 lg:grid-cols-3">
                  <div className="rounded-2xl border border-gray-100 p-6 dark:border-gray-800 lg:col-span-2">
                    <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                      <Package className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-wide">Description</span>
                    </div>
                    <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                      {product.description || 'No description provided for this product yet.'}
                    </p>
                    <p className="mt-4 text-xs text-gray-400">
                      Last updated: {product.lastUpdated ? new Date(product.lastUpdated).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 p-6 dark:border-gray-800">
                    <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                      <Tag className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-wide">Scan & Share</span>
                    </div>
                    <div className="mt-4 flex flex-col items-center justify-center space-y-3">
                      {productViewUrl ? (
                        <>
                          {/*<Barcode
                            value={productViewUrl}
                            height={70}
                            width={1.2}
                            displayValue={false}
                            background="transparent"
                            lineColor="#111827"
                          />*/}
                          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                            Scan this barcode to open the product page.
                          </p>
                          <a
                            href={productViewUrl}
                            className="text-xs font-medium text-brand-main hover:text-brand-third"
                          >
                            {productViewUrl}
                          </a>
                        </>
                      ) : (
                        <p className="text-xs text-gray-500 dark:text-gray-400">Generating barcode...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthShield>
  );

};

export default ProductDetailPage;

