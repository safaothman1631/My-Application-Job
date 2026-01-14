'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'گەڕان بۆ خزمەتگوزاری...' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder={placeholder}
          className="w-full px-6 py-4 pr-14 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl hover:scale-110 transition-transform duration-300"
        >
          🔍
        </button>
      </div>
    </form>
  );
}
