'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  FolderOpen, 
  MessageSquare, 
  ClipboardList,
  Image as ImageIcon,
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Categories', href: '/dashboard/categories', icon: FolderOpen },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Custom Orders', href: '/dashboard/custom-orders', icon: ClipboardList },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Inquiries', href: '/dashboard/inquiries', icon: MessageSquare },
  { name: 'Media Library', href: '/dashboard/media', icon: ImageIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0 overflow-y-auto flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#F4A340]">Lam African</h1>
        <p className="text-sm text-gray-400">Admin Panel</p>
        {user && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-xs text-gray-400">Logged in as</p>
            <p className="text-sm font-medium">{user.name || user.email}</p>
          </div>
        )}
      </div>
      
      <nav className="px-4 space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-[#F4A340] text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
