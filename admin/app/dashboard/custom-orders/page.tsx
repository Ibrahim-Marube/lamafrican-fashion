'use client';
import { useEffect, useState } from 'react';
import { customOrdersAPI } from '@/lib/api';
export default function CustomOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const r = await customOrdersAPI.getAll();
        setOrders(Array.isArray(r.data) ? r.data : (Array.isArray(r.data?.data) ? r.data.data : []));
      } catch (e: any) {
        setError(e?.response?.data?.message || e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  return (<div className="p-6"><h1 className="text-xl font-semibold mb-4">Custom Orders</h1><ul>{orders.map((o,i)=><li key={o.id||o._id||i}>{o.name||'Custom Order'}</li>)}</ul></div>);
}
