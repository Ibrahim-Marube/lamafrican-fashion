#!/usr/bin/env bash
set -euo pipefail
cd "$HOME/lamafrican-fashion/admin"
mkdir -p app/dashboard/{products,orders,categories,custom-orders,customers,inquiries,media}
cat > app/dashboard/products/page.tsx << 'EOTS'
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
EOTS
cat > app/dashboard/orders/page.tsx << 'EOTS'
'use client';
import { useEffect, useState } from 'react';
import { ordersAPI } from '@/lib/api';
export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const r = await ordersAPI.getAll();
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
  return (<div className="p-6"><h1 className="text-xl font-semibold mb-4">Orders</h1><ul>{orders.map((o,i)=><li key={o.id||o._id||i}>{o.orderNumber||o._id||'Order'}</li>)}</ul></div>);
}
EOTS
cat > app/dashboard/categories/page.tsx << 'EOTS'
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
EOTS
cat > app/dashboard/custom-orders/page.tsx << 'EOTS'
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
EOTS
cat > app/dashboard/customers/page.tsx << 'EOTS'
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
EOTS
cat > app/dashboard/inquiries/page.tsx << 'EOTS'
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
EOTS
cat > app/dashboard/media/page.tsx << 'EOTS'
'use client';
import { useEffect, useState } from 'react';
import { mediaAPI } from '@/lib/api';
export default function MediaPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const r = await mediaAPI.getAll();
        setFiles(Array.isArray(r.data) ? r.data : (Array.isArray(r.data?.data) ? r.data.data : []));
      } catch (e: any) {
        setError(e?.response?.data?.message || e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  return (<div className="p-6"><h1 className="text-xl font-semibold mb-4">Media</h1><ul>{files.map((f,i)=><li key={f.id||f._id||i}>{f.filename||f.name||'File'}</li>)}</ul></div>);
}
EOTS
DEV_PID=$(lsof -ti tcp:3001 || true); if [ -n "$DEV_PID" ]; then kill "$DEV_PID" || true; sleep 1; fi
npm run dev >/dev/null 2>&1 & disown || true
echo ok
