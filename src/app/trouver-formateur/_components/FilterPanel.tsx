'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterPanelProps {
  onFilterChange: (type: 'type' | 'niveau' | 'public', value: string[]) => void;
}

const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedNiveaux, setSelectedNiveaux] = useState<string[]>([]);
  const [selectedPublics, setSelectedPublics] = useState<string[]>([]);

  useEffect(() => {
    const updateFilters = () => {
      onFilterChange('type', selectedTypes);
      onFilterChange('niveau', selectedNiveaux);
      onFilterChange('public', selectedPublics);
    };
    
    const debounceTimer = setTimeout(updateFilters, 300);
    return () => clearTimeout(debounceTimer);
  }, [selectedTypes, selectedNiveaux, selectedPublics, onFilterChange]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleNiveauChange = (niveau: string) => {
    setSelectedNiveaux(prev =>
      prev.includes(niveau) ? prev.filter(n => n !== niveau) : [...prev, niveau]
    );
  };

  const handlePublicChange = (public_: string) => {
    setSelectedPublics(prev =>
      prev.includes(public_) ? prev.filter(p => p !== public_) : [...prev, public_]
    );
  };
  return (
    <Card className="bg-background-card border-background-border">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Option de filtre</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-white font-medium mb-3">Type de Formation</h4>
          <div className="space-y-2">
            {['Présentielle', 'En ligne', 'En alternance'].map((type) => (
              <label key={type} className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                <Checkbox
                  className="border-background-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                />
                <span className="ml-2">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Niveau</h4>
          <div className="space-y-2">
            {['Débutant', 'Intermédiaire', 'Avancé'].map((level) => (
              <label key={level} className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                <Checkbox
                  className="border-background-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  checked={selectedNiveaux.includes(level)}
                  onChange={() => handleNiveauChange(level)}
                />
                <span className="ml-2">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Public admis</h4>
          <div className="space-y-2">
            {['Étudiants', 'Élèves', 'Diplomés'].map((public_) => (
              <label key={public_} className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                <Checkbox
                  className="border-background-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  checked={selectedPublics.includes(public_)}
                  onChange={() => handlePublicChange(public_)}
                />
                <span className="ml-2">{public_}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;