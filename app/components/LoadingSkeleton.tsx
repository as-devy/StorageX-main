'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  animate?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width, 
  height, 
  rounded = false, 
  animate = true 
}) => {
  const baseClasses = `bg-slate-200 ${animate ? 'animate-pulse' : ''} ${rounded ? 'rounded-full' : 'rounded'} ${className}`;
  
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return <div className={baseClasses} style={style} />;
};

// Dashboard specific skeleton components
export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="flex-1 bg-slate-50 overflow-auto">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton width={200} height={32} />
            <Skeleton width={300} height={20} />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} width={40} height={32} rounded />
              ))}
            </div>
            <Skeleton width={120} height={40} rounded />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton width={40} height={40} rounded />
                  <div className="space-y-2">
                    <Skeleton width={120} height={16} />
                    <Skeleton width={80} height={24} />
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Skeleton width={16} height={16} rounded />
                  <Skeleton width={40} height={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Low Stock Alerts Skeleton */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <Skeleton width={150} height={24} />
                <Skeleton width={80} height={20} />
              </div>
            </div>
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Skeleton width={12} height={12} rounded />
                    <div className="space-y-1">
                      <Skeleton width={180} height={16} />
                      <Skeleton width={120} height={14} />
                    </div>
                  </div>
                  <Skeleton width={60} height={28} rounded />
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights Skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Skeleton width={40} height={40} rounded />
                <Skeleton width={100} height={24} />
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <Skeleton width={120} height={16} className="mb-2" />
                  <Skeleton width={200} height={12} />
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <Skeleton width={120} height={16} className="mb-2" />
                  <Skeleton width={180} height={12} />
                </div>
              </div>
              <Skeleton width="100%" height={32} className="mt-4" rounded />
            </div>
          </div>
        </div>

        {/* Store Performance Skeleton */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <Skeleton width={150} height={24} className="mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Skeleton width={16} height={16} />
                  <div className="space-y-1">
                    <Skeleton width={120} height={14} />
                    <Skeleton width={80} height={12} />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton width={40} height={12} />
                  <Skeleton width={8} height={8} rounded />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Skeleton */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <Skeleton width={150} height={24} />
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-3">
                  <Skeleton width={32} height={32} rounded />
                  <div className="flex-1 space-y-1">
                    <Skeleton width={150} height={16} />
                    <Skeleton width={200} height={14} />
                  </div>
                  <Skeleton width={60} height={12} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Table skeleton for inventory
export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({ 
  rows = 5, 
  columns = 6 
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-6 py-3 text-left">
                  <Skeleton width={80} height={16} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <Skeleton width={colIndex === 0 ? 120 : 80} height={16} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Card skeleton
export const CardSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton 
            key={i} 
            width={i === 0 ? '80%' : i === lines - 1 ? '60%' : '100%'} 
            height={16} 
          />
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
