import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

const CTA = () => {
  return (
    <section className="py-20 bg-motif text-white">
      <div className="container mx-auto px-6 md:px-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Prêt à commencer votre parcours d&apos;apprentissage ?
        </h2>
        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Rejoignez notre communauté de formateurs et d&apos;apprenants dès aujourd&apos;hui et transformez votre façon d&apos;apprendre.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary-light">
            <Link href="/inscription">
              Créer un compte
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="hover:border-secondary-dark text-white hover:bg-secondary-dark">
            <Link href="/formateurs">
              Explorer les formateurs
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;