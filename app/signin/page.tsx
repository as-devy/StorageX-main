'use client';

import { useRouter } from 'next/navigation';
import SignInPage from '@/app/components/SignInPage';
import { PageType } from '@/app/types';

export default function Login() {
  const router = useRouter();

  const handlePageChange = (page: PageType) => {
    // Handle page navigation - you can customize this based on your routing needs
    if (page === 'dashboard') {
      router.push('/dashboard');
    } else if (page === 'sign-up') {
      router.push('/signup');
    } else if (page === 'landing') {
      router.push('/');
    }
  };

  return <SignInPage onPageChange={handlePageChange} />;
}
