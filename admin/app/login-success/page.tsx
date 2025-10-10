'use client';

import { useEffect } from 'react';

export default function LoginSuccessPage() {
  useEffect(() => {
    const redirect = () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/login';
      }
    };
    
    setTimeout(redirect, 500);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F4A340] mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
