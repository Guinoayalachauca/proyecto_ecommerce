import React from 'react';
import { Product } from '../types';
import { Plus, ShoppingCart } from 'lucide-react';
import { CURRENCY_SYMBOL } from '../constants';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm border border-green-100">
          {product.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-bold text-gray-800 text-lg mb-1 leading-tight group-hover:text-green-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">Precio</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-gray-900">{CURRENCY_SYMBOL}{product.price.toFixed(2)}</span>
              <span className="text-gray-400 text-xs">/{product.unit}</span>
            </div>
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white p-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-600/20 active:scale-95 group/btn flex items-center justify-center gap-2"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <span className="hidden sm:inline text-sm font-semibold">Agregar</span>
            <Plus size={18} className="group-active/btn:rotate-90 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};