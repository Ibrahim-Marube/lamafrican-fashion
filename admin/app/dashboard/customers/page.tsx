'use client';
import { useEffect, useState } from 'react';
import { customersAPI } from '@/lib/api';
export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const r = await customersAPI.getAll();
        setCustomers(Array.isArray(r.data) ? r.data : (Array.isArray(r.data?.data) ? r.data.data : []));
      } catch (e: any) {
        setError(e?.response?.data?.message || e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  return (<div className="p-6"><h1 className="text-xl font-semibold mb-4">Customers</h1><ul>{customers.map((c,i)=><li key={c.id||c._id||i}>{c.name||c.email||'Customer'}</li>)}</ul></div>);
}
