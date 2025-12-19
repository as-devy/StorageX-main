'use client';

import React from 'react';
import { Plus } from 'lucide-react';

const StoresContent: React.FC = () => {
  return (
    <div className="flex-1 bg-slate-50 overflow-auto">
      <div className="bg-white border-b border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Store Locations</h1>
            <p className="text-slate-600 mt-1">Manage inventory across all locations</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Store</span>
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Multi-Location Management</h3>
          <p className="text-slate-600">Complete store management interface would include store details, inventory distribution, performance metrics, and location-specific analytics.</p>
        </div>
      </div>
    </div>
  );
};

export default StoresContent;