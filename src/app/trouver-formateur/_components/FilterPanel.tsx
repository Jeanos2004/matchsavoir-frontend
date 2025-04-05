'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Filter, Sparkles, Users, GraduationCap } from 'lucide-react';

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
    <Card className="bg-gradient-to-br from-[#1a1e2e]/95 to-[#0f1219]/95 backdrop-blur-sm border-[#2a3042]/50 hover:border-blue-500/50 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-blue-400" />
          <CardTitle className="text-xl text-white font-medium">Filtres</CardTitle>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedTypes.length > 0 && (
            <Badge variant="info">{selectedTypes.length} type{selectedTypes.length > 1 ? 's' : ''}</Badge>
          )}
          {selectedNiveaux.length > 0 && (
            <Badge variant="success">{selectedNiveaux.length} niveau{selectedNiveaux.length > 1 ? 'x' : ''}</Badge>
          )}
          {selectedPublics.length > 0 && (
            <Badge variant="warning">{selectedPublics.length} public{selectedPublics.length > 1 ? 's' : ''}</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h4 className="text-white font-medium">Type de Formation</h4>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {['Présentielle', 'En ligne', 'En alternance'].map((type) => (
              <label
                key={type}
                className={`flex items-center p-2 rounded-lg border border-[#2a3042]/30 ${selectedTypes.includes(type) ? 'bg-blue-500/10 border-blue-500/30' : 'hover:border-blue-500/20 hover:bg-[#1a1e2e]/50'} cursor-pointer transition-all duration-300`}
              >
                <Checkbox
                  className="border-[#2a3042] data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => handleTypeChange(type)}
                />
                <span className={`ml-2 ${selectedTypes.includes(type) ? 'text-blue-400' : 'text-gray-300'}`}>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <h4 className="text-white font-medium">Niveau</h4>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {['Débutant', 'Intermédiaire', 'Avancé'].map((level) => (
              <label
                key={level}
                className={`flex items-center p-2 rounded-lg border border-[#2a3042]/30 ${selectedNiveaux.includes(level) ? 'bg-emerald-500/10 border-emerald-500/30' : 'hover:border-emerald-500/20 hover:bg-[#1a1e2e]/50'} cursor-pointer transition-all duration-300`}
              >
                <Checkbox
                  className="border-[#2a3042] data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                  checked={selectedNiveaux.includes(level)}
                  onCheckedChange={() => handleNiveauChange(level)}
                />
                <span className={`ml-2 ${selectedNiveaux.includes(level) ? 'text-emerald-400' : 'text-gray-300'}`}>{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-yellow-400" />
            <h4 className="text-white font-medium">Public admis</h4>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {['Étudiants', 'Élèves', 'Diplomés'].map((public_) => (
              <label
                key={public_}
                className={`flex items-center p-2 rounded-lg border border-[#2a3042]/30 ${selectedPublics.includes(public_) ? 'bg-yellow-500/10 border-yellow-500/30' : 'hover:border-yellow-500/20 hover:bg-[#1a1e2e]/50'} cursor-pointer transition-all duration-300`}
              >
                <Checkbox
                  className="border-[#2a3042] data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                  checked={selectedPublics.includes(public_)}
                  onCheckedChange={() => handlePublicChange(public_)}
                />
                <span className={`ml-2 ${selectedPublics.includes(public_) ? 'text-yellow-400' : 'text-gray-300'}`}>{public_}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;