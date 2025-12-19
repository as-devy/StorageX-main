'use client';

import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import SignUpPage from './components/SignUpPage';
import { PageType } from './types';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');

  const handlePageChange = (page: PageType) => {
    console.log('Page change requested:', page);
    setCurrentPage(page);
  };

  useEffect(() => {
    if (currentPage === 'sign-in') {
      setCurrentPage('dashboard');
    }
  }, [currentPage]);

  if (currentPage === 'landing') {
    return <LandingPage onPageChange={handlePageChange} />;
  }

  if (currentPage === 'sign-up') {
    return <SignUpPage onPageChange={handlePageChange} />;
  }
  
  // Handle dashboard and all other pages
  return <DashboardLayout initialPage={currentPage} onPageChange={handlePageChange} />;
}