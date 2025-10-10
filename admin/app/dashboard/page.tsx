'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await new Promise(r => setTimeout(r, 100));
      const token = localStorage.getItem('adminToken');
      const userData = localStorage.getItem('adminUser');

      if (!token) {
        if (!cancelled) router.replace('/login');
        return;
      }

      if (userData && !cancelled) {
        try {
          setUser(JSON.parse(userData));
        } catch {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          if (!cancelled) router.replace('/login');
          return;
        }
      }
      if (!cancelled) setReady(true);
    };

    run();
    return () => { cancelled = true; };
  }, [router]);

  if (!ready) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!user) return null;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
