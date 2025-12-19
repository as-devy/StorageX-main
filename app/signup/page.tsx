'use client';

import { useRouter } from 'next/navigation';
import SignUpPage from '@/app/components/SignUpPage';
import { PageType } from '@/app/types';

export default function Signup() {
  const router = useRouter();

  const handlePageChange = (page: PageType) => {
    // Handle page navigation - you can customize this based on your routing needs
    if (page === 'dashboard') {
      router.push('/dashboard');
    } else if (page === 'sign-in') {
      router.push('/signin');
    } else if (page === 'landing') {
      router.push('/');
    }
  };

  return <SignUpPage onPageChange={handlePageChange} />;
}