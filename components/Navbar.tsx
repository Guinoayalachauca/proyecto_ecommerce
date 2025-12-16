import React from 'react';
import { Search, ShoppingCart, Menu, Store } from 'lucide-react';
import { APP_NAME } from '../constants';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onCartClick,
  searchQuery,
  onSearchChange
}) => {
  return (
    <nav className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm backdrop-blur-xl bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-600/20">
              <Store size={24} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500 hidden sm:block">
              {APP_NAME}
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 sm:text-sm"
                placeholder="Buscar frutas, verduras, lácteos..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onCartClick}
              className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors group"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-green-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 transform translate-x-1/4 -translate-y-1/4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full shadow-sm border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="sm:hidden p-3 rounded-xl hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};