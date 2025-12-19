'use client';

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PageType } from '../types';

interface BreadcrumbProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPage, onPageChange }) => {
  const getPageLabel = (page: PageType): string => {
    switch (page) {
      case 'dashboard':
        return 'Dashboard';
      case 'inventory':
        return 'Inventory';
      case 'low-stock':
        return 'Low Stock Alerts';
      case 'ai-insights':
        return 'AI Insights';
      case 'stores':
        return 'Store Locations';
      case 'settings':
        return 'Settings';
      case 'general':
        return 'General Settings';
      case 'stores-config':
        return 'Store Configuration';
      case 'ai-settings':
        return 'AI Settings';
      case 'notifications':
        return 'Notifications';
      case 'billing':
        return 'Billing';
      case 'documentation':
        return 'API Documentation';
      case 'support':
        return 'Support';
      default:
        return 'Dashboard';
    }
  };

  const getParentPage = (page: PageType): PageType | null => {
    const settingsPages = ['general', 'stores-config', 'ai-settings', 'notifications', 'billing'];
    if (settingsPages.includes(page)) {
      return 'settings';
    }
    return null;
  };

  const parentPage = getParentPage(currentPage);

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-4" aria-label="Breadcrumb">
      <button
        onClick={() => onPageChange('dashboard')}
        className="flex items-center hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        aria-label="Go to dashboard"
      >
        <Home className="w-4 h-4" aria-hidden="true" />
        <span className="sr-only">Home</span>
      </button>
      
      {parentPage && (
        <>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <button
            onClick={() => onPageChange(parentPage)}
            className="hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
          >
            {getPageLabel(parentPage)}
          </button>
        </>
      )}
      
      <ChevronRight className="w-4 h-4" aria-hidden="true" />
      <span className="text-slate-900 font-medium" aria-current="page">
        {getPageLabel(currentPage)}
      </span>
    </nav>
  );
};

export default Breadcrumb;
