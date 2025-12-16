import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { AiChef } from './components/AiChef';
import { PRODUCTS } from './constants';
import { CartItem, Category, Product } from './types';
import { ArrowRight, Leaf } from 'lucide-react';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mercadofresco_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  // Save cart to local storage when changed
  useEffect(() => {
    localStorage.setItem('mercadofresco_cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    // Show temporary notification
    setShowNotification(`Agregaste ${product.name} al carrito`);
    setTimeout(() => setShowNotification(null), 2500);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      });
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        cartCount={cartItemCount} 
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section - Only show when no search is active */}
      {!searchQuery && selectedCategory === 'Todos' && (
        <div className="bg-gradient-to-br from-green-800 to-green-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-green-900/40 backdrop-blur-sm px-4 py-1.5 rounded-full text-green-100 text-sm font-medium mb-6 border border-green-500/30">
                <Leaf size={16} /> 100% Frescura Garantizada
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Lo mejor del campo <br/>
                <span className="text-green-300">directo a tu mesa.</span>
              </h1>
              <p className="text-lg text-green-100 mb-8 max-w-lg leading-relaxed">
                Seleccionamos cuidadosamente cada producto para asegurar la mejor calidad para ti y tu familia. Envíos el mismo día.
              </p>
              <button 
                onClick={() => document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-green-800 px-8 py-4 rounded-xl font-bold hover:bg-green-50 transition-all flex items-center gap-2 shadow-xl shadow-green-900/20 active:scale-95"
              >
                Comprar Ahora <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full" id="products-grid">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `Resultados para "${searchQuery}"` : selectedCategory === 'Todos' ? 'Productos Destacados' : selectedCategory}
          </h2>
          <span className="text-sm text-gray-500 font-medium">
            {filteredProducts.length} productos encontrados
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="text-6xl mb-4">🥗</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No encontramos lo que buscas</h3>
            <p className="text-gray-500">Intenta con otra categoría o término de búsqueda.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('Todos');}}
              className="mt-6 text-green-600 font-semibold hover:text-green-700"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">MercadoFresco</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tu supermercado online de confianza. Calidad premium, precios justos y entrega rápida.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-green-600 cursor-pointer">Sobre Nosotros</li>
                <li className="hover:text-green-600 cursor-pointer">Envíos y Devoluciones</li>
                <li className="hover:text-green-600 cursor-pointer">Contacto</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Contacto</h3>
              <p className="text-gray-500 text-sm">hola@mercadofresco.com</p>
              <p className="text-gray-500 text-sm">+52 55 1234 5678</p>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} MercadoFresco. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />

      <AiChef cart={cart} products={PRODUCTS} />

      {/* Notification Toast */}
      <div 
        className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center gap-2 ${
          showNotification ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        {showNotification}
      </div>
    </div>
  );
}

export default App;