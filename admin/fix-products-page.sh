#!/usr/bin/env bash
set -euo pipefail
ROOT="$HOME/lamafrican-fashion/admin"
cd "$ROOT"
mkdir -p app/dashboard/products
if [ -f app/dashboard/products/page.tsx ]; then cp app/dashboard/products/page.tsx app/dashboard/products/page.tsx.bak; fi
cat > app/dashboard/products/page.tsx << 'EOTS'
'use client';

import { useEffect, useState } from 'react';
import { productsAPI } from '@/lib/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await productsAPI.getAll();
      const list = Array.isArray(response.data)
        ? response.data
        : (Array.isArray(response.data?.data) ? response.data.data : []);
      setProducts(list);
    } catch (error: any) {
      console.error('Failed to fetch products:', error?.response?.status, error?.response?.data || error?.message);
      setErrorMsg(typeof error?.response?.data === 'string'
        ? error.response.data
        : (error?.response?.data?.message || error?.message || 'Failed to fetch products'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (errorMsg) return <div className="p-6 text-red-600">{errorMsg}</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Products</h1>
      <ul className="list-disc pl-6">
        {(Array.isArray(products) ? products : []).map((p: any, idx: number) => (
          <li key={p.id || p._id || p.sku || idx}>{p.name || p.title || 'Unnamed product'}</li>
        ))}
      </ul>
    </div>
  );
}
EOTS
DEV_PID=$(lsof -ti tcp:3001 || true)
if [ -n "$DEV_PID" ]; then kill "$DEV_PID" || true; sleep 1; fi
npm run dev >/dev/null 2>&1 & disown || true
echo ok
