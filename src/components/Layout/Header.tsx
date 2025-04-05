"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { ButtonLink } from '../ui/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="text-white py-4 bg-slate-900/40 sticky top-0 z-50">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold flex items-center">
            <span className="text-secondary mr-1">Match</span>Savoir
          </Link>

          {/* Navigation pour desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/trouver-formateur" className="text-sm hover:text-secondary transition-colors">
              Formation
            </Link>
            <Link href="/trouver-formateur" className="text-sm hover:text-secondary transition-colors">
              Formateurs
            </Link>
            <Link href="#contact" className="text-sm hover:text-secondary transition-colors">
              Contactez-nous
            </Link>
          </nav>

          <div className="hidden md:flex space-x-4 ">
            <ButtonLink className='bg-[#e85d04]' variant="secondary" href="/connexion">
              Connexion
            </ButtonLink>
            <ButtonLink className='hover:bg-[#e85d04] border-mg border-white ' href="/inscription">
              S&apos;inscrire
            </ButtonLink>
          </div>

          {/* Bouton menu mobile */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="hover:text-secondary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                href="/propositions" 
                className="hover:text-secondary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Propositions
              </Link>
              <Link 
                href="/a-propos" 
                className="hover:text-secondary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                À Propos
              </Link>
              <Link 
                href="/contact" 
                className="hover:text-secondary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contactez-nous
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <ButtonLink variant="secondary" href="/connexion" className="w-full">
                  Connexion
                </ButtonLink>
                <ButtonLink href="/inscription" className="w-full">
                  S&apos;inscrire
                </ButtonLink>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;