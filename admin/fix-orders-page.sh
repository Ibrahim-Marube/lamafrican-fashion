#!/usr/bin/env bash
set -euo pipefail
ROOT="$HOME/lamafrican-fashion/admin"
cd "$ROOT"
mkdir -p app/dashboard/orders
if [ -f app/dashboard/orders/page.tsx ]; then cp app/dashboard/orders/page.tsx app/dashboard/orders/page.tsx.bak; fi
cat > app/dashboard/orders/page.tsx << 'EOTS'
'use client';

import { useEffect, useState } from 'react';
import { ordersAPI } from '@/lib/api';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await ordersAPI.getAll();
      const list = Array.isArray(response.data)
        ? response.data
        : (Array.isArray(response.data?.data) ? response.data.data : []);
      setOrders(list);
    } catch (error: any) {
      console.error('Failed to fetch orders:', error?.response?.status, error?.response?.data || error?.message);
      setErrorMsg(typeof error?.response?.data === 'string'
        ? error.response.data
        : (error?.response?.data?.message || error?.message || 'Failed to fetch orders'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (errorMsg) return <div className="p-6 text-red-600">{errorMsg}</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Orders</h1>
      <ul className="list-disc pl-6">
        {(Array.isArray(orders) ? orders : []).map((o: any, idx: number) => (
          <li key={o.id || o._id || idx}>
            {(o.orderNumber || o._id || 'Order') + ' — ' + (o.status || 'UNKNOWN')}
          </li>
        ))}
      </ul>
    </div>
  );
}
EOTS
DEV_PID=$(lsof -ti tcp:3001 || true); if [ -n "$DEV_PID" ]; then kill "$DEV_PID" || true; sleep 1; fi
npm run dev >/dev/null 2>&1 & disown || true
echo ok
