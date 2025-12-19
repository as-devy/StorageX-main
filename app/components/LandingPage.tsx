'use client';

import React, { useState } from 'react';
import { 
  Menu, X, ArrowRight, Play
} from 'lucide-react';
import { PageType } from '../types';
import PricingSection from './PricingSection';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import StatsSection from './StatsSection';
import FAQSection from './FAQSection';
import { HeroWithMockup } from '../../components/blocks/hero-with-mockup';
import Image from 'next/image';
interface LandingPageProps {
  onPageChange: (page: PageType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navigation */}
      <nav className="absolute top-0 z-50 w-full py-4">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Logo - Left side */}
            <div className="flex items-center flex-shrink-0 px-4 sm:px-6 lg:px-10">
              <Image width={120} height={40} src={'/logo.png'} alt='logo' className="h-8 sm:h-10 lg:h-12 w-auto"></Image>
            </div>
            
            {/* Navigation Links - Absolutely centered */}
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <a href="#features" className="text-black hover:text-slate-900 font-medium transition-colors duration-200 relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#pricing" className="text-black hover:text-slate-900 font-medium transition-colors duration-200 relative group">
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#testimonials" className="text-black hover:text-slate-900 font-medium transition-colors duration-200 relative group">
                Reviews
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            </div>
            
            {/* Buttons - Right side */}
            <div className="hidden sm:flex items-center gap-1 lg:gap-2 flex-shrink-0">
              <button 
                onClick={() => onPageChange('dashboard')}
                className="text-black px-2 lg:px-4 py-2 text-xs lg:text-sm rounded hover:bg-gray-100 hover:text-slate-800 transition-all duration-200 font-medium"
              >
                <span className="hidden lg:inline">Book a Demo</span>
                <span className="lg:hidden">Demo</span>
              </button>
              <div className="w-[1px] h-8 lg:h-10 bg-slate-600 mr-1 lg:mr-2"></div>
              <button 
                onClick={() => {
                  console.log('Sign In button clicked');
                  onPageChange('dashboard');
                }}
                className="text-black px-2 lg:px-4 py-2 rounded text-xs lg:text-sm border border-slate-600 hover:bg-white transition-all duration-200 font-medium"
              >
                Sign In
              </button>
              <button 
                onClick={() => {
                  console.log('Get Started button clicked');
                  onPageChange('sign-up');
                }}
                className="bg-blue-700 text-white px-2 lg:px-4 py-2 rounded text-xs lg:text-sm transform hover:scale-105 transition-all duration-200 font-medium"
              >
                <span className="hidden lg:inline">Get Started</span>
                <span className="lg:hidden">Start</span>
              </button>
            </div>

            <div className="sm:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-slate-100 hover:scale-105 transition-all duration-200">
                {isMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/50 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">Features</a>
              <a href="#pricing" className="block py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">Pricing</a>
              <a href="#testimonials" className="block py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">Reviews</a>
              <div className="flex flex-col space-y-2 pt-2">
                <button 
                  onClick={() => onPageChange('sign-up')}
                  className="w-full bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold shadow-lg"
                >
                  Get Started
                </button>
                <button 
                  onClick={() => onPageChange('dashboard')}
                  className="w-full border border-slate-300 text-slate-700 px-4 py-3 rounded-lg font-medium"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => onPageChange('dashboard')}
                  className="w-full text-slate-600 px-4 py-3 rounded-lg font-medium"
                >
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <HeroWithMockup
        title="Smart Inventory Management Powered by AI"
        description="Transform your retail operations with intelligent inventory management. Predict demand, prevent stockouts, and maximize profits with our advanced AI platform."
        primaryCta={{
          text: "Start Free Trial",
          onClick: () => {
            console.log('Start Free Trial button clicked');
            onPageChange('sign-up');
          },
        }}
        secondaryCta={{
          text: "Watch Demo",
          onClick: () => {
            console.log('Watch Demo button clicked');
            onPageChange('dashboard');
          },
          icon: <Play className="mr-2 h-4 w-4" />,
        }}
        mockupImage={{
          src: "/dashboard.png",
          alt: "Storagex Dashboard Preview",
          width: 800,
          height: 600,
        }}
        className="relative overflow-hidden"
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="bg-slate-100 py-8 relative overflow-hidden">
        {/* Separator Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gray-200"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center py-6 space-y-4 lg:space-y-0">
            {/* Left Section - Logo and Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center">
                <Image width={120} height={40} src={'/logo.png'} alt='Storagex logo' className="h-8 w-auto"></Image>
              </div>
              <span className="text-gray-500 text-sm text-center sm:text-left">Copyright © Storagex Inc. 2025</span>
            </div>
            
            {/* Center Section - Legal Links */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm transition-colors">Legal</a>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm transition-colors text-center">Do Not Sell or Share My Personal Information</a>
            </div>
            
            {/* Right Section - Social Media Icons */}
            <div className="flex items-center space-x-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;