'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from './_components/SearchBar';
import FilterPanel from './_components/FilterPanel';
import FormationCard from './_components/FormationCard';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';

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
      title: 'Formation JavaScript Avancée',
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
    <div className="min-h-screen bg-motif relative overflow-hidden">
      {/* Couches de fond */}
      <div className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-b before:from-blue-950/90 before:via-indigo-950/80 before:to-[#070b14]/95 before:backdrop-blur-sm">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 container mx-auto py-8 px-4 space-y-8">
        {/* En-tête */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">Trouvez votre formation idéale</span>
          </div>
          <h1 className="text-4xl font-bold text-white">
            Découvrez nos formations
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explorez notre sélection de formations de qualité et trouvez celle qui correspond à vos objectifs professionnels.
          </p>
        </div>

        {/* Barre de recherche */}
        <SearchBar onSearch={handleSearch} />

        {/* Contenu principal */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Panneau de filtres */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-8 lg:h-fit">
            <FilterPanel onFilterChange={handleFilterChange} />
          </div>

          {/* Liste des formations */}
          <div className="flex-1 space-y-8">
            {/* En-tête des résultats */}
            <div className="flex items-center justify-between">
              <p className="text-gray-400">
                {filteredFormations.length} formation{filteredFormations.length > 1 ? 's' : ''} trouvée{filteredFormations.length > 1 ? 's' : ''}
              </p>
            </div>

            {/* Grille des formations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentFormations.map((formation) => (
                <FormationCard key={formation.id} formation={formation} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/20"
                  size="lg"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Précédent
                </Button>
                <div className="flex items-center px-4 py-2 rounded-lg bg-[#1a1e2e]/80 border border-[#2a3042]/50">
                  <span className="text-gray-400">Page</span>
                  <span className="text-white font-medium mx-2">{currentPage}</span>
                  <span className="text-gray-400">sur {totalPages}</span>
                </div>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/20"
                  size="lg"
                >
                  Suivant
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}