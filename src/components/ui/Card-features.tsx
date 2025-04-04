"use client";

import { Button } from "./Button";

interface CardProps {
  key: any;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}
export function CardDemo({
    key,
    title,
    description,
    image,
    buttonText,
    buttonLink
  }: CardProps) {
  return (
    <div className="max-w-xs w-full">
      <div className="relative h-96 rounded-lg overflow-hidden group">
        {/* Image de fond */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-black/70" />

        {/* Contenu */}
        <div className="relative h-full p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="font-bold text-xl md:text-2xl text-white">
              {title}
            </h1>
            <p className="text-sm text-white/90">
              {description}
            </p>
          </div>

          {/* Bouton - Utilisation de pointer-events-auto pour s'assurer qu'il est cliquable */}
          <div className="pointer-events-auto mt-4">
            <Button
              href={buttonLink}
              variant={key === 1 ? 'secondary' : 'default'}
              className="bg-[#e85d04] hover:bg-[#ff6b0d] w-full justify-center transition-all duration-300 transform hover:translate-y-[-2px]"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
