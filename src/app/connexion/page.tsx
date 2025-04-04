"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '@/components/Login/LoginForm';

export default function ConnexionPage() {
  return (
    <div className="min-h-screen bg-[#1a1e2e] flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#0f1219] shadow-xl rounded-lg overflow-hidden border border-[#2a3042] flex flex-col md:flex-row max-w-6xl mx-auto">
          {/* Colonne de gauche - Texte et image */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col bg-gradient-to-br from-primary to-primary-light text-white">
            <div className="">
              <div className="mb-8 flex justify-center md:justify-start">
                <Link href="/" className="text-2xl font-bold flex items-center">
                  <span className="text-secondary mr-1">Match</span>Savoir
                </Link>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Bienvenue sur <span className="text-secondary">MatchSavoir</span>
              </h1>
              
              <p className="text-gray-200 mb-2">
                Connectez-vous pour accéder à votre espace personnel et retrouver vos formations ou vos apprenants. Découvrez une expérience d&apos;apprentissage personnalisée.
              </p>
            </div>
            
            <div className="relative w-full h-[300px] mt-4">
              <Image 
                src="/images/hero-illustration.svg" 
                alt="Connexion MatchSavoir" 
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
          
          {/* Colonne de droite - Formulaire */}
          <div className="md:w-1/2 p-8 md:p-12">
            <div className="text-center md:text-left mb-8">
              <h2 className="text-2xl font-bold text-white">
                <span className="text-secondary">Connexion</span> à votre compte
              </h2>
              <p className="mt-2 text-gray-400">
                Entrez vos identifiants pour accéder à votre espace personnel
              </p>
            </div>
            
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}