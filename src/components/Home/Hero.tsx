import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';

const Hero = () => {
  return (
    <section className="bg-motif text-white h-[100vh] py-18 md:py-24" >
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight animate-fadeIn">
              Trouvez le <span className="text-[#e85d04]">Savoir</span> qui vous correspond
            </h1>
            <p className="text-lg mb-8 text-gray-300">
              Vous êtes à la recherche d&apos;un formateur pour une 
              classe inversée ou vous êtes un expert dans votre 
              domaine? <span className="text-secondary font-medium">MatchSavoir</span> vous aide en toute simplicité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className='bg-[#e85d04] hover:shadow-lg' href="/trouver-formateur" size="lg" variant="secondary">
                Trouver mon formateur
              </Button>
              <Button href="/devenir-formateur" size="lg" variant="outline" className="border-white text-white hover:bg-[#e85d04] hover:border-[#e85d04] hover:shadow-lg">
                Devenir formateur
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md h-[300px] md:h-[400px]">
              <Image 
                src="/images/hero-image.png" 
                alt="MatchSavoir - Mise en relation formateurs et apprenants" 
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;