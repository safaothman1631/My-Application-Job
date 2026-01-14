'use client';

interface CategoryCardProps {
  icon: string;
  title: string;
  titleKu?: string;
  color: string;
  onClick?: () => void;
}

export function CategoryCard({ icon, title, titleKu, color, onClick }: CategoryCardProps) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:scale-105 transition-transform active:scale-95 cursor-pointer"
    >
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md hover:shadow-lg transition-shadow"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-700 text-center">{title}</span>
    </button>
  );
}

export function CategoryGrid() {
  const handleCategoryClick = (category: string) => {
    console.log('Selected category:', category);
    // Navigate to category page or filter providers
  };

  const categories = [
    { icon: '⚡', title: 'Electrician', titleKu: 'کارەبا', color: '#FCD34D' },
    { icon: '🔧', title: 'Plumber', titleKu: 'پایپ', color: '#60A5FA' },
    { icon: '🧹', title: 'Cleaning', titleKu: 'پاککردنەوە', color: '#93C5FD' },
    { icon: '🔧', title: 'Mechanic', titleKu: 'مێکانیک', color: '#F87171' },
    { icon: '📱', title: 'Mobile Repair', titleKu: 'مۆبایل', color: '#34D399' },
    { icon: '📦', title: 'More', titleKu: 'زیاتر', color: '#FBBF24' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {categories.map((category, index) => (
        <CategoryCard 
          key={index} 
          {...category} 
          onClick={() => handleCategoryClick(category.title)}
        />
      ))}
    </div>
  );
}
