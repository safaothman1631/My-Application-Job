'use client';

import { useEffect, useState } from 'react';

interface Category {
  id: string;
  nameKu: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  servicesCount: number;
}

interface CategoriesGridProps {
  onCategoryClick: (categoryId: string) => void;
}

export function CategoriesGrid({ onCategoryClick }: CategoriesGridProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/categories?limit=20');
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 animate-pulse">
            <div className="w-16 h-16 bg-white/20 rounded-xl mb-4"></div>
            <div className="h-4 bg-white/20 rounded mb-2"></div>
            <div className="h-3 bg-white/20 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  // Default categories if none exist
  const defaultCategories = [
    { id: '1', nameKu: 'کارەبایی', icon: '💡', servicesCount: 15 },
    { id: '2', nameKu: 'پلامبەری', icon: '🔧', servicesCount: 12 },
    { id: '3', nameKu: 'مەکانیک', icon: '🔩', servicesCount: 18 },
    { id: '4', nameKu: 'پاککردنەوە', icon: '🧹', servicesCount: 8 },
    { id: '5', nameKu: 'چاککردنەوەی مۆبایل', icon: '📱', servicesCount: 22 },
    { id: '6', nameKu: 'سەرتاشی', icon: '✂️', servicesCount: 10 },
    { id: '7', nameKu: 'نانەوایی', icon: '🍞', servicesCount: 5 },
    { id: '8', nameKu: 'زیاتر...', icon: '➕', servicesCount: 0 },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
        <span className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center ml-3 text-xl">📂</span>
        جۆرەکان
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
          >
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {category.icon || '🛠️'}
            </div>
            <h4 className="text-lg font-bold text-white mb-1">{category.nameKu}</h4>
            <p className="text-teal-200 text-sm">
              {category.servicesCount} خزمەتگوزاری
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
