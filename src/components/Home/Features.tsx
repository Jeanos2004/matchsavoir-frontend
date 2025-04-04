import React from 'react';
import { CardDemo } from '../ui/Card-features';

const Features = () => {
  const features = [
    {
      title: 'Trouver une formation',
      description: 'Accédez à notre catalogue de formations et trouvez celle qui correspond à vos besoins. Filtrez par domaine, niveau ou disponibilité.',
      image: '/images/trouver-formation.jpg',
      buttonText: 'Rechercher',
      buttonLink: '/formations'
    },
    {
      title: 'Proposer des formations',
      description: 'Vous êtes expert dans votre domaine? Partagez vos connaissances en proposant des formations sur notre plateforme.',
      image: '/images/proposer-formation.jpg',
      buttonText: 'S\'inscrire',
      buttonLink: '/devenir-formateur'
    },
    {
      title: 'Trouver un formateur',
      description: 'Besoin d\'un accompagnement personnalisé? Trouvez le formateur idéal selon vos critères et disponibilités.',
      image: '/images/trouver-formateur.jpg',
      buttonText: 'Rechercher',
      buttonLink: '/formateurs'
    }
  ];

  return (
    <section className="py-16 bg-[#ffe]" id='propositions'>
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-3xl text-gray-900 font-bold text-center mb-4">Nos Propositions</h2>
        <p className="text-center text-gray-800 mb-12 max-w-2xl mx-auto">
          Que vous soyez à la recherche d&apos;une formation ou que vous souhaitiez partager vos connaissances, MatchSavoir vous offre des solutions adaptées à vos besoins.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <CardDemo
              key={index}
              title={feature.title}
              image={feature.image}
              description={feature.description}
              buttonText={feature.buttonText}
              buttonLink={feature.buttonLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;