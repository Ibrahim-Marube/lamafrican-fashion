'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-md' : 'bg-white/90 backdrop-blur-md'}`}>
      <div className="max-w-full">
        <div className="h-24 flex items-center justify-between px-6">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image 
              src="/logo@2x.png" 
              alt="Lamafrican Fashion" 
              width={200} 
              height={55} 
              priority 
              className="h-18 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link 
              href="/" 
              className={`text-[17px] font-bold transition-colors relative py-2 ${
                isActive('/') 
                  ? 'text-[#2C5326]' 
                  : 'text-gray-800 hover:text-[#2C5326]'
              }`}
            >
              Home
              {isActive('/') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5326]"></span>}
            </Link>
            <Link 
              href="/products" 
              className={`text-[17px] font-bold transition-colors relative py-2 ${
                isActive('/products') 
                  ? 'text-[#2C5326]' 
                  : 'text-gray-800 hover:text-[#2C5326]'
              }`}
            >
              Shop
              {isActive('/products') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5326]"></span>}
            </Link>
            <Link 
              href="/custom-order" 
              className={`text-[17px] font-bold transition-colors relative py-2 ${
                isActive('/custom') 
                  ? 'text-[#2C5326]' 
                  : 'text-gray-800 hover:text-[#2C5326]'
              }`}
            >
              Custom Order
              {isActive('/custom') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5326]"></span>}
            </Link>
            <Link 
              href="/lookbook" 
              className={`text-[17px] font-bold transition-colors relative py-2 ${
                isActive('/lookbook') 
                  ? 'text-[#2C5326]' 
                  : 'text-gray-800 hover:text-[#2C5326]'
              }`}
            >
              Look Book
              {isActive('/lookbook') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5326]"></span>}
            </Link>
            <Link 
              href="/contact" 
              className={`text-[17px] font-bold transition-colors relative py-2 ${
                isActive('/contact') 
                  ? 'text-[#2C5326]' 
                  : 'text-gray-800 hover:text-[#2C5326]'
              }`}
            >
              Contact
              {isActive('/contact') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5326]"></span>}
            </Link>
          </nav>

          <div className="flex items-center gap-6">
            {status === 'authenticated' ? (
              <>
                <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full">
                  <User className="w-4 h-4 text-[#2C5326]" strokeWidth={2.5} />
                  <span className="text-sm font-semibold text-gray-800">{session.user?.email}</span>
                  {session.user?.role === 'admin' && (
                    <span className="text-xs bg-[#2C5326] text-white px-2 py-0.5 rounded-full">Admin</span>
                  )}
                </div>
                <button
                  onClick={handleSignOut}
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-50 transition-colors"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-red-600" strokeWidth={2.5} />
                </button>
              </>
            ) : (
              <Link 
                href="/auth/login" 
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-gray-800" strokeWidth={2.5} />
              </Link>
            )}

            <Link 
              href="/cart" 
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-800" strokeWidth={2.5} />
              {itemCount > 0 && (
                <span suppressHydrationWarning={true} className="absolute -top-1 -right-1 bg-[#2C5326] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" strokeWidth={2.5} /> : <Menu className="w-6 h-6" strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl">
            <nav className="px-6 py-6 space-y-1">
              <Link 
                href="/" 
                className={`block text-base font-semibold py-3 px-4 rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-[#2C5326] text-white' 
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className={`block text-base font-semibold py-3 px-4 rounded-lg transition-colors ${
                  isActive('/products') 
                    ? 'bg-[#2C5326] text-white' 
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/custom-order" 
                className={`block text-base font-semibold py-3 px-4 rounded-lg transition-colors ${
                  isActive('/custom') 
                    ? 'bg-[#2C5326] text-white' 
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Custom Order
              </Link>
              <Link 
                href="/lookbook" 
                className={`block text-base font-semibold py-3 px-4 rounded-lg transition-colors ${
                  isActive('/lookbook') 
                    ? 'bg-[#2C5326] text-white' 
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Look Book
              </Link>
              <Link 
                href="/contact" 
                className={`block text-base font-semibold py-3 px-4 rounded-lg transition-colors ${
                  isActive('/contact') 
                    ? 'bg-[#2C5326] text-white' 
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="border-t border-gray-200 pt-4 mt-4">
                {status === 'authenticated' ? (
                  <>
                    <div className="flex items-center gap-3 py-3 px-4 bg-gray-100 rounded-lg mb-2">
                      <User className="w-5 h-5 text-[#2C5326]" strokeWidth={2.5} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{session.user?.email}</p>
                        {session.user?.role === 'admin' && (
                          <span className="text-xs bg-[#2C5326] text-white px-2 py-0.5 rounded-full mt-1 inline-block">Admin</span>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleSignOut();
                      }}
                      className="flex items-center gap-3 text-base font-semibold py-3 px-4 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
                    >
                      <LogOut className="w-5 h-5" strokeWidth={2.5} />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    href="/auth/login" 
                    className="flex items-center gap-3 text-base font-semibold py-3 px-4 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5" strokeWidth={2.5} />
                    Login / Register
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
