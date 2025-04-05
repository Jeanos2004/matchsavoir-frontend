'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  onSearch: (search: string, location: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm, location);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, location, onSearch]);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Saisissez un nom, un mot clé, un domaine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gradient-to-br from-[#1a1e2e]/95 to-[#0f1219]/95 backdrop-blur-sm border border-[#2a3042]/50 focus:border-blue-500/50 focus:outline-none text-white shadow-lg transition-all duration-300 placeholder:text-gray-400"
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Lieu"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gradient-to-br from-[#1a1e2e]/95 to-[#0f1219]/95 backdrop-blur-sm border border-[#2a3042]/50 focus:border-blue-500/50 focus:outline-none text-white shadow-lg transition-all duration-300 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Suggestions populaires */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-sm text-gray-400">Suggestions :</span>
        <div className="flex gap-2 flex-wrap">
          {['Python', 'JavaScript', 'Design', 'Marketing', 'Business', 'Data Science'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-3 py-1 text-sm text-gray-300 bg-[#1a1e2e]/80 rounded-full border border-[#2a3042]/30 hover:border-blue-500/30 hover:text-blue-400 transition-all duration-300"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;