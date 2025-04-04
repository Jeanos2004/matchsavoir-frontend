'use client';

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
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
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mx-auto mb-8">
      <div className="flex-1 relative">
        <Input
          type="text"
          placeholder="Saisissez un nom, un mot clé, un domaine..."
          className="bg-background-card border-background-border text-white focus-visible:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="w-5 h-5 text-primary absolute right-3 top-1/2 transform -translate-y-1/2" />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Lieu"
          className="bg-background-card border-background-border text-white focus-visible:ring-primary"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <MapPin className="w-5 h-5 text-primary absolute right-3 top-1/2 transform -translate-y-1/2" />
      </div>
    </div>
  );
};

export default SearchBar;