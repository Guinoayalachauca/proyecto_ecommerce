import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  selectedCategory: Category | 'Todos';
  onSelectCategory: (category: Category | 'Todos') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  const categories = ['Todos', ...Object.values(Category)];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4 sticky top-20 z-20 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200/50">
      <div className="flex gap-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat as Category | 'Todos')}
            className={`
              whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
              ${selectedCategory === cat 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/25 scale-105' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};