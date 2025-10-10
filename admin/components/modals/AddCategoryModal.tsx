'use client';

import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { categoriesAPI } from '@/lib/api';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCategoryModal({ isOpen, onClose, onSuccess }: AddCategoryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('slug', formData.slug);
      data.append('price', formData.price);
      if (thumbnail) {
        data.append('thumbnail', thumbnail);
      }

      await categoriesAPI.create(data);
      alert('Category added successfully!');
      onSuccess();
      onClose();
      
      setFormData({ name: '', slug: '', price: '' });
      setThumbnail(null);
    } catch (error) {
      console.error('Failed to add category:', error);
      alert('Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Category</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A340] focus:border-transparent"
              placeholder="Maxi Dress"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Slug (auto-generated)
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A340] focus:border-transparent"
              placeholder="maxi-dress"
            />
            <p className="text-xs text-gray-500 mt-1">
              Used in URLs: /categories/{formData.slug || 'category-slug'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Price (KSh)
            </label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A340] focus:border-transparent"
              placeholder="8500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail Image (optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#F4A340] transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                className="hidden"
                id="thumbnail-upload"
              />
              <label htmlFor="thumbnail-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {thumbnail ? thumbnail.name : 'Click to upload thumbnail'}
                </p>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-[#F4A340] text-white rounded-lg hover:bg-[#e69730] transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
