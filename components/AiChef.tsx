import React, { useState, useRef, useEffect } from 'react';
import { ChefHat, Send, X, Sparkles, MessageSquare } from 'lucide-react';
import { CartItem, ChatMessage, Product } from '../types';
import { getChefAdvice } from '../services/geminiService';

interface AiChefProps {
  cart: CartItem[];
  products: Product[];
}

export const AiChef: React.FC<AiChefProps> = ({ cart, products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy tu Chef Virtual. ¿Qué te gustaría cocinar hoy? Puedo sugerirte recetas con lo que tienes en tu carrito.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg = inputText;
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getChefAdvice(userMsg, cart, products);

    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-30 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <ChefHat size={24} />
        <span className="font-semibold">Chef IA</span>
      </button>

      {/* Chat Interface */}
      <div className={`fixed bottom-6 right-6 w-full max-w-[380px] bg-white rounded-2xl shadow-2xl z-40 flex flex-col transition-all duration-300 origin-bottom-right border border-gray-200 overflow-hidden ${isOpen ? 'scale-100 opacity-100 h-[600px]' : 'scale-90 opacity-0 pointer-events-none h-0'}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <ChefHat size={20} />
            </div>
            <div>
              <h3 className="font-bold">Chef Virtual</h3>
              <p className="text-xs text-orange-100 flex items-center gap-1">
                <Sparkles size={10} /> Potenciado por Gemini
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-orange-500 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                }`}
              >
                {/* Simple Markdown rendering for bolding */}
                {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('-') ? 'ml-2' : ''}>
                        {line.split('**').map((part, j) => 
                            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                        )}
                    </p>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe un ingrediente o platillo..."
            className="flex-1 bg-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          />
          <button 
            type="submit" 
            disabled={isLoading || !inputText.trim()}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white p-2 rounded-xl transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </>