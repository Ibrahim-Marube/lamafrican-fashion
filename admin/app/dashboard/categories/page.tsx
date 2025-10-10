'use client';
import { useEffect, useState } from 'react';
import { categoriesAPI } from '@/lib/api';
export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const r = await categoriesAPI.getAll();
        setCategories(Array.isArray(r.data) ? r.data : (Array.isArray(r.data?.data) ? r.data.data : []));
      } catch (e: any) {
        setError(e?.response?.data?.message || e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  return (<div className="p-6"><h1 className="text-xl font-semibold mb-4">Categories</h1><ul>{categories.map((c,i)=><li key={c.id||c._id||i}>{c.name||'Category'}</li>)}</ul></div>);
}
