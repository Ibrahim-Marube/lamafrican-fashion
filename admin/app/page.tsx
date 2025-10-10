'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    router.replace(token ? '/dashboard' : '/login');
  }, [router]);
  return <div className="flex items-center justify-center min-h-screen">Redirecting...</div>;
}
