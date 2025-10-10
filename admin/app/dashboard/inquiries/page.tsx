'use client';
import { useEffect, useState } from 'react';
import { inquiriesAPI } from '@/lib/api';
export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const r = await inquiriesAPI.getAll();
        setInquiries(Array.isArray(r.data) ? r.data : (Array.isArray(r.data?.data) ? r.data.data : []));
      } catch (e: any) {
        setError(e?.response?.data?.message || e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  return (<div className="p-6"><h1 className="text-xl font-semibold mb-4">Inquiries</h1><ul>{inquiries.map((q,i)=><li key={q.id||q._id||i}>{q.name||q.email||'Inquiry'}</li>)}</ul></div>);
}
