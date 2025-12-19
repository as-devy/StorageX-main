'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      // Apply theme to document
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        console.log('Applied dark theme to document');
      } else {
        document.documentElement.classList.remove('dark');
        console.log('Applied light theme to document');
      }
    }
  }, [theme, mounted]);

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log('Toggling theme from', theme, 'to', theme === 'light' ? 'dark' : 'light');
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    // Return a placeholder during SSR
    return (
      <div className={`w-10 h-10 rounded-lg bg-gray-100 ${className}`} />
    );
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        rounded-lg
        bg-gray-100 dark:bg-gray-800
        text-gray-700 dark:text-gray-300
        hover:bg-gray-200 dark:hover:bg-gray-700
        hover:text-gray-900 dark:hover:text-gray-100
        transition-all duration-300
        flex items-center justify-center
        shadow-sm hover:shadow-md
        ${className}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon className={`${iconSizes[size]} transition-transform duration-300`} />
      ) : (
        <Sun className={`${iconSizes[size]} transition-transform duration-300`} />
      )}
    </button>
  );
}

export default ThemeToggle;
