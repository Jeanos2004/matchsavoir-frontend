'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Wallet } from 'lucide-react';

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

const FormationCard = ({ formation }: { formation: Formation }) => {
  return (
    <Card className="group relative overflow-hidden bg-black/20 hover:bg-black/30 backdrop-blur-[2px] border-[0.5px] border-white/[0.05] hover:border-blue-500/20 transition-all duration-300">
      <CardContent className="p-4">
        {/* En-tête avec image et titre */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-blue-400/10 to-blue-600/10 p-[1px] ring-1 ring-white/10">
            <div className="h-full w-full rounded-full overflow-hidden bg-black/40">
              <Image
                src={formation.instructorImage}
                alt={formation.instructor}
                width={40}
                height={40}
                className="scale-110 object-cover"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-white truncate group-hover:text-blue-400/90 transition-colors">
              {formation.title}
            </h3>
            <p className="text-xs text-gray-400 truncate flex items-center mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500/40 mr-1.5"></span>
              {formation.instructor}
            </p>
          </div>
          <Badge variant="outline" className="text-xs border-blue-500/20 bg-blue-500/5 text-blue-400/90 px-2 py-0.5">
            {formation.type}
          </Badge>
        </div>

        {/* Informations principales */}
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center text-gray-400">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
              {formation.duration}
            </div>
            <div className="flex items-center text-gray-400">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
              {formation.location}
            </div>
            <div className="flex items-center text-gray-400 col-span-2">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
              <span className="truncate">
                Du {new Date(formation.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} au {new Date(formation.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
              </span>
            </div>
          </div>
        </div>

        {/* Prix et bouton */}
        <CardFooter className="flex items-center justify-between px-0 pb-0 pt-2 border-t border-white/[0.04]">
          <p className="flex items-center text-sm text-blue-400/90">
            <Wallet className="w-3.5 h-3.5 mr-1.5 opacity-70" />
            {formation.price.toLocaleString()} Fg
          </p>
          <Button 
            variant="ghost"
            size="sm"
            className="h-7 px-3 text-xs bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 text-blue-400/90 border border-blue-500/20 hover:border-blue-500/30">
            Voir les détails
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default FormationCard;