#!/usr/bin/env bash
set -euo pipefail
ROOT="$HOME/lamafrican-fashion/admin"
echo "=> Working in $ROOT"
cd "$ROOT"
mkdir -p app/dashboard
cat > app/dashboard/page.tsx << 'EOTS'
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
      if (!token) { if (!cancelled) router.replace('/login'); return; }
      if (userData && !cancelled) {
        try { setUser(JSON.parse(userData)); }
        catch { localStorage.removeItem('adminToken'); localStorage.removeItem('adminUser'); if (!cancelled) router.replace('/login'); return; }
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
EOTS
echo "✓ Updated app/dashboard/page.tsx"

cat > app/page.tsx << 'EOTS'
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
EOTS
echo "✓ Updated app/page.tsx"

mkdir -p app/login
if [ ! -f app/login/page.tsx ]; then
cat > app/login/page.tsx << 'EOTS'
'use client';

import { useState } from 'react';
import { authAPI } from '@/lib/api';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authAPI.login(formData.email, formData.password);
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.user));
      setTimeout(() => { window.location.replace('/dashboard'); }, 50);
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Email</label>
          <input type="email" required value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" required value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
      </form>
    </div>
  );
}
EOTS
fi

sed -i '.bak' "s|window.location.href = '/dashboard'|window.location.replace('/dashboard')|g" app/login/page.tsx || true
rm -f app/login/page.tsx.bak
if ! grep -q "window.location.replace('/dashboard')" app/login/page.tsx; then
  awk '1; /localStorage.setItem.*adminUser/ { print "      setTimeout(() => { window.location.replace('\''/dashboard'\''); }, 50);"; }' app/login/page.tsx > app/login/page.tsx.tmp && mv app/login/page.tsx.tmp app/login/page.tsx
fi
echo "✓ Ensured login redirect uses window.location.replace('/dashboard')"

DEV_PID=$(lsof -ti tcp:3001 || true)
if [ -n "$DEV_PID" ]; then
  kill "$DEV_PID" || true
  sleep 1
fi

npm run dev &>/dev/null & disown || true
echo "✓ Admin dev server restarting. If not auto-started, run: npm run dev"
echo "Done. Hard refresh (Cmd+Shift+R), then login at http://localhost:3001/login"
