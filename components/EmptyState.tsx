'use client';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-8xl mb-6 opacity-50">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/60 mb-6 max-w-md">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Predefined empty states
export const emptyStates = {
  noBookings: {
    icon: '📋',
    title: 'هیچ داواکاریەکت نییە',
    description: 'هێشتا هیچ داواکاریەکت نەکردووە. دەستپێبکە و یەکەم خزمەتگوزارییەکەت داوابکە!',
  },
  noServices: {
    icon: '🔍',
    title: 'هیچ خزمەتگوزاریەک نەدۆزرایەوە',
    description: 'هیچ خزمەتگوزاریەک بەردەست نییە لەم هەرێمەدا. تکایە دواتر دووبارە هەوڵبدەرەوە.',
  },
  noNotifications: {
    icon: '🔕',
    title: 'هیچ ئاگادارکردنەوەیەک نییە',
    description: 'کاتێک شتێکی نوێت بۆ هەیە، لێرە دەیبینیتەوە.',
  },
  noMessages: {
    icon: '💬',
    title: 'هیچ پەیامێک نییە',
    description: 'یەکەم پەیامت بنێرە و دەستپێبکە بە گفتگۆکردن!',
  },
  noReviews: {
    icon: '⭐',
    title: 'هیچ هەڵسەنگاندنێک نییە',
    description: 'هێشتا کەس هەڵسەنگاندنێکی نەنووسیوە.',
  },
  noResults: {
    icon: '🔍',
    title: 'هیچ ئەنجامێک نەدۆزرایەوە',
    description: 'هەوڵبدە بە وشەی جیاواز بگەڕێیت یان فلتەرەکان بگۆڕە.',
  },
  offline: {
    icon: '📡',
    title: 'هێڵی ئینتەرنێت نییە',
    description: 'تکایە هێڵی ئینتەرنێتەکەت پشکنین بکەرەوە و دووبارە هەوڵبدەرەوە.',
  },
  error: {
    icon: '⚠️',
    title: 'کێشەیەک ڕوویدا',
    description: 'تکایە دواتر دووبارە هەوڵبدەرەوە یان پەیوەندی بکە بە پاڵپشتیەوە.',
  },
};
