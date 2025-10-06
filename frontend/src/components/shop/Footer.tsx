export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Lamafrican Fashion</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Life isn't perfect but your outfit can be. Premium African fashion for the modern world.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/products" className="text-gray-400 hover:text-white transition-colors">All Products</a></li>
              <li><a href="/products?category=women" className="text-gray-400 hover:text-white transition-colors">Women's Collection</a></li>
              <li><a href="/products?category=men" className="text-gray-400 hover:text-white transition-colors">Men's Collection</a></li>
              <li><a href="/products?category=accessories" className="text-gray-400 hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/custom" className="text-gray-400 hover:text-white transition-colors">Custom Orders</a></li>
              <li><a href="/lookbook" className="text-gray-400 hover:text-white transition-colors">Look Book</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2C5326] transition-colors">
                📸
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2C5326] transition-colors">
                📱
              </a>
              <a href="https://wa.me/254712345678" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                💬
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              📍 Nairobi, Kenya<br />
              📞 +254 712 345 678
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2025 Lamafrican Fashion. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
