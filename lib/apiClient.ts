// lib/apiClient.ts
import { supabase } from './supabaseClient';

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Merge existing headers if provided
  if (options.headers && typeof options.headers === 'object') {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Handle 401 Unauthorized - token expired or invalid
    if (response.status === 401) {
      const errorData = await response.json().catch(() => ({}));

      // Log the error but don't automatically sign out
      // Let the calling component handle the error appropriately
      console.log('🔓 Token validation failed:', errorData);
    }

    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}