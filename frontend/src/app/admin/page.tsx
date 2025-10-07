'use client';
import { useState, useEffect } from 'react';
import { Trash2, Eye, X } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('contacts');
  const [contacts, setContacts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === 'contacts' ? '/api/contacts' : '/api/custom-orders';
      const res = await fetch(endpoint);
      const data = await res.json();
      if (activeTab === 'contacts') {
        setContacts(data.contacts || []);
      } else {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching:', error);
    }
    setLoading(false);
  };

  const deleteContact = async (id) => {
    if (!confirm('Delete this contact?')) return;
    await fetch(`/api/contacts?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  const deleteOrder = async (id) => {
    if (!confirm('Delete this order?')) return;
    await fetch(`/api/custom-orders?id=${id}`, { method: 'DELETE' });
    setSelectedOrder(null);
    fetchData();
  };

  const updateStatus = async (id, status) => {
    await fetch('/api/custom-orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchData();
    if (selectedOrder?._id === id) {
      setSelectedOrder({ ...selectedOrder, status });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 rounded-lg font-semibold ${
              activeTab === 'contacts' ? 'bg-green-700 text-white' : 'bg-white'
            }`}
          >
            Contacts ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-lg font-semibold ${
              activeTab === 'orders' ? 'bg-green-700 text-white' : 'bg-white'
            }`}
          >
            Custom Orders ({orders.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">{activeTab === 'contacts' ? 'Subject' : 'Status'}</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeTab === 'contacts' ? (
                  contacts.map((c) => (
                    <tr key={c._id} className="border-t">
                      <td className="p-4">{c.name}</td>
                      <td className="p-4">{c.email}</td>
                      <td className="p-4">{c.phone}</td>
                      <td className="p-4">{c.subject}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => deleteContact(c._id)} className="text-red-600">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  orders.map((o) => (
                    <tr key={o._id} className="border-t">
                      <td className="p-4">{o.name}</td>
                      <td className="p-4">{o.email}</td>
                      <td className="p-4">{o.phone}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded text-xs font-semibold ${
                          o.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          o.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4 text-right flex gap-2 justify-end">
                        <button onClick={() => setSelectedOrder(o)} className="text-blue-600">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button onClick={() => deleteOrder(o._id)} className="text-red-600">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {(activeTab === 'contacts' ? contacts : orders).length === 0 && (
              <div className="text-center py-12 text-gray-500">No {activeTab} found</div>
            )}
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <button onClick={() => setSelectedOrder(null)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <strong>Customer:</strong> {selectedOrder.name}
              </div>
              <div>
                <strong>Email:</strong> {selectedOrder.email}
              </div>
              <div>
                <strong>Phone:</strong> {selectedOrder.phone}
              </div>
              <div>
                <strong>Status:</strong>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => updateStatus(selectedOrder._id, e.target.value)}
                  className="ml-2 px-3 py-1 border rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              {selectedOrder.fabricChoice && (
                <div>
                  <strong>Fabric:</strong> {selectedOrder.fabricChoice}
                </div>
              )}
              {selectedOrder.designPreferences && (
                <div>
                  <strong>Design Notes:</strong> {selectedOrder.designPreferences}
                </div>
              )}
              <div>
                <strong>Measurements:</strong>
                <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                  {Object.entries(selectedOrder.measurements || {}).map(([k, v]) => (
                    v && <div key={k}>{k}: {v}cm</div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2 border rounded"
                >
                  Close
                </button>
                <button
                  onClick={() => deleteOrder(selectedOrder._id)}
                  className="px-6 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
