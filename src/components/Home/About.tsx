import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <section className="py-20 bg-[#ffe]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image 
                src="/images/purpose-image.jpeg" 
                alt="À propos de MatchSavoir" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Notre <span className="text-[#e85d04]">Mission</span>
            </h2>
            <p className="text-gray-700 mb-6 text-md">
              Chez MatchSavoir, nous croyons que chaque personne mérite d&apos;accéder à une éducation de qualité, adaptée à ses besoins spécifiques. Notre mission est de démocratiser l&apos;accès au savoir en connectant les apprenants avec les formateurs qui correspondent parfaitement à leurs objectifs.
            </p>
            <p className="text-gray-700 mb-8 text-md">
              Nous avons développé une plateforme intuitive qui utilise des algorithmes avancés pour créer des correspondances optimales, garantissant ainsi une expérience d&apos;apprentissage personnalisée et efficace.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0f1219] p-4 rounded-lg border border-[#2a3042]">
                <h3 className="text-xl font-semibold mb-2 text-white">Pour les apprenants</h3>
                <p className="text-gray-300 text-md">Trouvez le formateur idéal pour développer vos compétences à votre rythme.</p>
              </div>
              <div className="bg-[#0f1219] p-4 rounded-lg border border-[#2a3042]">
                <h3 className="text-xl font-semibold mb-2 text-white">Pour les formateurs</h3>
                <p className="text-gray-300 text-md">Partagez votre expertise et développez votre activité avec des apprenants motivés.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;