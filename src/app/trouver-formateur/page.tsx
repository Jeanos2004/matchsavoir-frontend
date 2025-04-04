'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from './_components/SearchBar';
import FilterPanel from './_components/FilterPanel';
import FormationCard from './_components/FormationCard';
import { Button } from '@/components/ui/Button';

interface Formation {
  id: number;
  title: string;
  instructor: string;
  price: number;
  duration: string;
  startDate: string;
  endDate: string;
  type: string;
  location: string;
  instructorImage: string;
}

export default function TrouverFormateurPage() {
  const [formations] = useState<Formation[]>([
    {
      id: 1,
      title: 'Formation Python Avancée',
      instructor: 'Dr. Mamadou Diallo',
      price: 1000,
      duration: '30 jours',
      startDate: '2024-06-21',
      endDate: '2024-06-23',
      type: 'En ligne',
      location: 'En ligne',
      instructorImage: '/images/instructor-1.svg'
    },
    {
      id: 2,
      title: 'Formation Python Avancée',
      instructor: 'Dr. Mamadou Diallo',
      price: 2000,
      duration: '60 jours',
      startDate: '2024-06-28',
      endDate: '2024-06-30',
      type: 'Présentielle',
      location: 'Présentielle',
      instructorImage: '/images/instructor-2.svg'
    },
    {
      id: 3,
      title: 'Formation Python Avancée',
      instructor: 'TechEvolution',
      price: 3000,
      duration: '90 jours',
      startDate: '2024-07-05',
      endDate: '2024-07-07',
      type: 'En ligne',
      location: 'En ligne',
      instructorImage: '/images/instructor-3.svg'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    type: [] as string[],
    niveau: [] as string[],
    public: [] as string[],
    search: '',
    location: ''
  });
  const [filteredFormations, setFilteredFormations] = useState<Formation[]>([]);
  const itemsPerPage = 6;

  useEffect(() => {
    const filtered = formations.filter(formation => {
      const matchesSearch = filters.search === '' ||
        formation.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        formation.instructor.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesLocation = filters.location === '' ||
        formation.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const matchesType = filters.type.length === 0 ||
        filters.type.includes(formation.type);

      return matchesSearch && matchesLocation && matchesType;
    });

    setFilteredFormations(filtered);
    setCurrentPage(1);
  }, [filters, formations]);

  const totalPages = Math.ceil(filteredFormations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFormations = filteredFormations.slice(startIndex, endIndex);

  const handleSearch = (search: string, location: string) => {
    setFilters(prev => ({ ...prev, search, location }));
  };

  const handleFilterChange = (type: 'type' | 'niveau' | 'public', value: string[]) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark to-primary-900/90">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-200">Trouvez</span>{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 to-secondary-200">la formation</span>{' '}
          <span className="text-white">qui vous convient le mieux</span>
        </h1>

        <SearchBar onSearch={handleSearch} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel onFilterChange={handleFilterChange} />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentFormations.map((formation) => (
                <FormationCard key={formation.id} formation={formation} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                >
                  Précédent
                </Button>
                <span className="flex items-center px-4 py-2 text-white bg-primary rounded">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                >
                  Suivant
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}