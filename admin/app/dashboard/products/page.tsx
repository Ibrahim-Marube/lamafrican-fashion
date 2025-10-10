'use client';
import { useEffect, useState } from 'react';
import { productsAPI } from '@/lib/api';
export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const r = await productsAPI.getAll();
        setProducts(Array.isArray(r.data) ? r.data : (Array.isArray(r.data?.data) ? r.data.data : []));
      } catch (e: any) {
        setError(e?.response?.data?.message || e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  return (<div className="p-6"><h1 className="text-xl font-semibold mb-4">Products</h1><ul>{products.map((p,i)=><li key={p.id||p._id||i}>{p.name||'Product'}</li>)}</ul></div>);
}
