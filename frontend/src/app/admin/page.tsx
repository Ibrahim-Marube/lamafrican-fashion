'use client';
import { useState, useEffect } from 'react';
import { Trash2, Eye, X, Edit, Plus, Save } from 'lucide-react';
import Image from 'next/image';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('contacts');
  const [contacts, setContacts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let endpoint = '';
      if (activeTab === 'contacts') endpoint = '/api/contacts';
      else if (activeTab === 'orders') endpoint = '/api/custom-orders';
      else if (activeTab === 'products') endpoint = '/api/products';
      
      const res = await fetch(endpoint);
      const data = await res.json();
      
      if (activeTab === 'contacts') setContacts(data.contacts || []);
      else if (activeTab === 'orders') setOrders(data.orders || []);
      else if (activeTab === 'products') setProducts(data.products || []);
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

  const updateProduct = async (product) => {
    try {
      await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product._id, ...product }),
      });
      setEditingProduct(null);
      fetchData();
    } catch (error) {
      alert('Failed to update product');
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    fetchData();
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
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-lg font-semibold ${
              activeTab === 'products' ? 'bg-green-700 text-white' : 'bg-white'
            }`}
          >
            Products ({products.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : activeTab === 'products' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p._id} className="bg-white rounded-lg shadow p-6">
                {p.primaryImage && (
                  <div className="relative h-48 mb-4">
                    <Image src={p.primaryImage} alt={p.name} fill className="object-cover rounded" />
                  </div>
                )}
                <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                <p className="text-green-700 font-bold text-xl mb-2">KES {p.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mb-2">Stock: {p.stock}</p>
                <p className="text-sm text-gray-600 mb-4">SKU: {p.sku}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingProduct(p)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Edit className="w-4 h-4 inline mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
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
                      <td className="p-4 text-right flex gap-2 justify-end">
                        <button onClick={() => setSelectedContact(c)} className="text-blue-600">
                          <Eye className="w-5 h-5" />
                        </button>
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
            {((activeTab === 'contacts' && contacts.length === 0) || (activeTab === 'orders' && orders.length === 0)) && (
              <div className="text-center py-12 text-gray-500">No {activeTab} found</div>
            )}
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Contact Details</h2>
              <button onClick={() => setSelectedContact(null)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div><strong>Name:</strong> {selectedContact.name}</div>
              <div><strong>Email:</strong> {selectedContact.email}</div>
              <div><strong>Phone:</strong> {selectedContact.phone || 'N/A'}</div>
              <div><strong>Subject:</strong> {selectedContact.subject || 'N/A'}</div>
              <div>
                <strong>Message:</strong>
                <p className="mt-2 p-4 bg-gray-50 rounded">{selectedContact.message}</p>
              </div>
              <div className="text-sm text-gray-500">
                Received: {new Date(selectedContact.createdAt).toLocaleString()}
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => setSelectedContact(null)}
                  className="px-6 py-2 border rounded"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    deleteContact(selectedContact._id);
                    setSelectedContact(null);
                  }}
                  className="px-6 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
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
              <div><strong>Customer:</strong> {selectedOrder.name}</div>
              <div><strong>Email:</strong> {selectedOrder.email}</div>
              <div><strong>Phone:</strong> {selectedOrder.phone}</div>
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
                <div><strong>Fabric:</strong> {selectedOrder.fabricChoice}</div>
              )}
              {selectedOrder.designPreferences && (
                <div><strong>Design Notes:</strong> {selectedOrder.designPreferences}</div>
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
                <button onClick={() => setSelectedOrder(null)} className="px-6 py-2 border rounded">
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

      {/* Product Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Edit Product</h2>
              <button onClick={() => setEditingProduct(null)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Price (KES)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Stock</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({...editingProduct, stock: Number(e.target.value)})}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Primary Image URL</label>
                <input
                  type="text"
                  value={editingProduct.primaryImage}
                  onChange={(e) => setEditingProduct({...editingProduct, primaryImage: e.target.value})}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => setEditingProduct(null)}
                  className="px-6 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateProduct(editingProduct)}
                  className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                >
                  <Save className="w-4 h-4 inline mr-1" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
