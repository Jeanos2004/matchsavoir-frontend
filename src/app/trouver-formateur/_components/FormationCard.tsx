'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

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
    <Card className="bg-background-card border-background-border hover:border-primary transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src={formation.instructorImage}
              alt={formation.instructor}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{formation.title}</h3>
            <p className="text-gray-400">{formation.instructor}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-secondary font-semibold">{formation.price} Fg</p>
          <p className="text-gray-300">Pour {formation.duration}</p>
          <p className="text-gray-300">Du {formation.startDate} au {formation.endDate}</p>
          <div className="flex items-center text-gray-300">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
              {formation.type}
            </span>
            <span className="ml-2 flex items-center text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {formation.location}
            </span>
          </div>
        </div>

        <CardFooter className="px-0 pb-0">
          <Button 
            className="w-full bg-primary hover:bg-primary-dark text-white transition-colors duration-300" 
            size="lg">
            Voir plus
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default FormationCard;