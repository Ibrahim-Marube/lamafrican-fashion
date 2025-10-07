'use client';

import { useState, useEffect } from 'react';
import { Package, MessageSquare, X, Eye, Trash2, Search } from 'lucide-react';

type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
};

type CustomOrder = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  measurements: any;
  designPreferences?: string;
  fabricChoice?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'orders'>('contacts');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orders, setOrders] = useState<CustomOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<CustomOrder | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'contacts') {
        const res = await fetch('/api/contacts');
        const data = await res.json();
        setContacts(data.contacts || []);
      } else {
        const res = await fetch('/api/custom-orders');
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Delete this contact?')) return;
    try {
      const res = await fetch(`/api/contacts?id=${id}`, { method: 'DELETE' });
      if (res.ok) setContacts(contacts.filter(c => c._id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm('Delete this order?')) return;
    try {
      const res = await fetch(`/api/custom-orders?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setOrders(orders.filter(o => o._id !== id));
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateOrderStatus = async (id: string, status: CustomOrder['status']) => {
    try {
      const res = await fetch('/api/custom-orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
        if (selectedOrder?._id === id) setSelectedOrder({ ...selectedOrder, status });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getStatusBadge = (status: CustomOrder['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>
        {status.toUpperCase().replace('-', ' ')}
      </span>
    );
  };

  const filteredOrders = orders.filter(o => {
    const match = o.name.toLowerCase().includes(searchTerm.toLowerCase()) || o.email.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || o.status === statusFilter;
    return match && statusMatch;
  });

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <div className="flex gap-4 mb-6">
          <button onClick={() => setActiveTab('contacts')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold ${activeTab === 'contacts' ? 'bg-[#2C5326] text-white' : 'bg-white text-gray-700'}`}>
            <MessageSquare className="w-5 h-5" />
            Contacts ({contacts.length})
          </button>
          <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold ${activeTab === 'orders' ? 'bg-[#2C5326] text-white' : 'bg-white text-gray-700'}`}>
            <Package className="w-5 h-5" />
            Custom Orders ({orders.length})
          </button>
        </div>
        <div className="bg-white rounded-xl p-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg" />
            </div>
            {activeTab === 'orders' && (
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border rounded-lg">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            )}
          </div>
        </div>
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="bg-white rounded-xl overflow-hidden">
            {activeTab === 'contacts' ? (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-left font-semibold">Subject</th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredContacts.map(c => (
                    <tr key={c._id}>
                      <td className="px-6 py-4">{c.name}</td>
                      <td className="px-6 py-4">{c.email}</td>
                      <td className="px-6 py-4">{c.subject}</td>
                      <td className="px-6 py-4">{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => deleteContact(c._id)} className="text-red-600">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Customer</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredOrders.map(o => (
                    <tr key={o._id}>
                      <td className="px-6 py-4">
                        <div className="font-medium">{o.name}</div>
                        <div className="text-sm text-gray-600">{o.email}</div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(o.status)}</td>
                      <td className="px-6 py-4">{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => setSelectedOrder(o)} className="text-blue-600 mr-2">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button onClick={() => deleteOrder(o._id)} className="text-red-600">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-8 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <button onClick={() => setSelectedOrder(null)}><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Customer Info</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p><strong>Name:</strong> {selectedOrder.name}</p>
                    <p><strong>Email:</strong> {selectedOrder.email}</p>
                    <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Order Status</h3>
                  <select value={selectedOrder.status} onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value as any)} className="w-full px-4 py-2 border rounded-lg">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Measurements</h3>
                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-3 gap-3 text-sm">
                  {Object.entries(selectedOrder.measurements).map(([k, v]) => (v && <div key={k}><strong>{k}:</strong> {v} cm</div>))}
                </div>
              </div>
              {selectedOrder.fabricChoice && (<div><h3 className="font-semibold mb-2">Fabric</h3><p className="bg-gray-50 rounded-lg p-4">{selectedOrder.fabricChoice}</p></div>)}
              {selectedOrder.designPreferences && (<div><h3 className="font-semibold mb-2">Design Notes</h3><p className="bg-gray-50 rounded-lg p-4">{selectedOrder.designPreferences}</p></div>)}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button onClick={() => setSelectedOrder(null)} className="px-6 py-2 border rounded-lg">Close</button>
                <button onClick={() => deleteOrder(selectedOrder._id)} className="px-6 py-2 bg-red-600 text-white rounded-lg">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}