'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AuthShieldProps {
    children: React.ReactNode;
}

export default function AuthShield({ children }: AuthShieldProps) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            try {
                const token = localStorage.getItem('auth_token');
                if (!token) {
                    console.warn('🔒 AuthShield: No token found, redirecting to sign-in');
                    setIsAuthenticated(false);
                    router.push('/signin');
                } else {
                    // Token exists, assume authenticated for now
                    // The page itself will handle API failures if the token is expired
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('🔒 AuthShield: Error checking authentication:', error);
                setIsAuthenticated(false);
                router.push('/signin');
            }
        };

        checkAuth();
    }, [router]);

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse"></div>
                    <Loader2 className="w-12 h-12 animate-spin text-blue-500 relative z-10" />
                </div>
                <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium animate-pulse">Verifying session...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Prevents flashing content while redirecting
    }

    return <>{children}</>;
}
