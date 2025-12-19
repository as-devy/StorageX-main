'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { PageType } from '../types';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

interface SignUpPageProps {
  onPageChange: (page: PageType) => void;
}

// API base URL - you can move this to an environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Validation schema
const signupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  company: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Move components outside to prevent recreation on each render
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
  </svg>
);

const GlassInputWrapper = ({ children, hasError }: { children: React.ReactNode; hasError?: boolean }) => (
  <div className={`rounded-2xl border ${hasError ? 'border-destructive' : 'border-border'} bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10`}>
    {children}
  </div>
);

const SignUpPage: React.FC<SignUpPageProps> = ({ onPageChange }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user starts typing - use functional updates
    setErrors(prev => {
      if (prev[name]) {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      }
      return prev;
    });
    setGeneralError(prev => prev ? '' : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = signupSchema.parse({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        company: formData.company.trim() || undefined,
        agreeToTerms: formData.agreeToTerms,
      });

      // Prepare full name for API
      const full_name = `${validatedData.firstName} ${validatedData.lastName}`;

      // Call the Node.js API signup endpoint
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: validatedData.email,
          password: validatedData.password,
          full_name: full_name,
          company_name: validatedData.company || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors
        setGeneralError(data.error || 'An error occurred during signup');
        return;
      }

      // Success - redirect to login page
      router.push('/signin');
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          const key = issue.path[0];
          if (typeof key === 'string') {
            fieldErrors[key] = issue.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        // Handle network errors
        setGeneralError('Network error. Please check your connection and try again.');
        console.error(err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col md:flex-row w-[100dvw] bg-background text-foreground">
      {/* Left column: sign-up form */}
      <section className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            {/* Back button */}
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>

            <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight">
              <span className="font-light text-foreground tracking-tighter">Create</span> Account
            </h1>
            <p className="animate-element animate-delay-200 text-muted-foreground">
              Join StorageX and transform your inventory management with AI-powered insights
            </p>

            {generalError && (
              <div className="animate-element animate-delay-300 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{generalError}</p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name fields */}
              <div className="animate-element animate-delay-300 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">First Name</label>
                  <GlassInputWrapper hasError={!!errors.firstName}>
                    <input 
                      name="firstName" 
                      type="text" 
                      placeholder="John" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" 
                    />
                  </GlassInputWrapper>
                  {errors.firstName && (
                    <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                  <GlassInputWrapper hasError={!!errors.lastName}>
                    <input 
                      name="lastName" 
                      type="text" 
                      placeholder="Doe" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" 
                    />
                  </GlassInputWrapper>
                  {errors.lastName && (
                    <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="animate-element animate-delay-400">
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <GlassInputWrapper hasError={!!errors.email}>
                  <input 
                    name="email" 
                    type="email" 
                    placeholder="john@company.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" 
                  />
                </GlassInputWrapper>
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              {/* Company */}
              <div className="animate-element animate-delay-500">
                <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                <GlassInputWrapper>
                  <input 
                    name="company" 
                    type="text" 
                    placeholder="Your Company Inc." 
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" 
                  />
                </GlassInputWrapper>
              </div>

              {/* Password */}
              <div className="animate-element animate-delay-600">
                <label className="text-sm font-medium text-muted-foreground">Password</label>
                <GlassInputWrapper hasError={!!errors.password}>
                  <div className="relative">
                    <input 
                      name="password" 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Create a strong password" 
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute inset-y-0 right-3 flex items-center"
                      disabled={isSubmitting}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                    </button>
                  </div>
                </GlassInputWrapper>
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="animate-element animate-delay-700">
                <label className="text-sm font-medium text-muted-foreground">Confirm Password</label>
                <GlassInputWrapper hasError={!!errors.confirmPassword}>
                  <div className="relative">
                    <input 
                      name="confirmPassword" 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      placeholder="Confirm your password" 
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                      className="absolute inset-y-0 right-3 flex items-center"
                      disabled={isSubmitting}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                    </button>
                  </div>
                </GlassInputWrapper>
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms and conditions */}
              <div className="animate-element animate-delay-800 flex items-start gap-3 text-sm">
                <input 
                  type="checkbox" 
                  name="agreeToTerms" 
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="custom-checkbox mt-1" 
                />
                <span className="text-foreground/90">
                  I agree to the <a href="#" className="text-violet-400 hover:underline transition-colors">Terms of Service</a> and <a href="#" className="text-violet-400 hover:underline transition-colors">Privacy Policy</a>
                </span>
              </div>
              {errors.agreeToTerms && (
                <p className="text-xs text-destructive -mt-3">{errors.agreeToTerms}</p>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="animate-element animate-delay-900 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="animate-element animate-delay-1000 relative flex items-center justify-center">
              <span className="w-full border-t border-border"></span>
              <span className="px-4 text-sm text-muted-foreground bg-background absolute">Or continue with</span>
            </div>

            <button 
              onClick={() => onPageChange('dashboard')} 
              className="animate-element animate-delay-1100 w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-4 hover:bg-secondary transition-colors"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="animate-element animate-delay-1200 text-center text-sm text-muted-foreground">
              Already have an account? <button onClick={() => router.push('/signin')} className="text-violet-400 hover:underline transition-colors">Sign In</button>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image */}
      <section className="hidden md:block flex-1 relative p-4">
        <div className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Welcome to StorageX</h2>
            <p className="text-muted-foreground mb-6">Join thousands of businesses already using AI to optimize their inventory management</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-foreground">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-muted-foreground">Products</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-foreground">AI</div>
                <div className="text-muted-foreground">Powered</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
