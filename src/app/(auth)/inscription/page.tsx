"use client";

import React from 'react';
import Image from 'next/image';
import SignupForm from '@/components/SignUp/SignupForm';

export default function InscriptionPage() {
  return (
    <div className="container">
      <div className="bg-[#0f1219] shadow-xl rounded-lg overflow-hidden border border-[#2a3042] flex flex-col md:flex-row max-w-6xl mx-auto">
        {/* Colonne de gauche - Texte et image */}
        <div className="md:w-1/2 flex flex-col bg-motif text-white">
          <div className="relative w-full h-[100%]">
            <Image 
              src="/images/signup-img.png" 
              alt="Inscription MatchSavoir" 
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
        
        {/* Colonne de droite - Formulaire */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-2xl font-bold text-white">
              <span className="text-secondary">Inscription</span> à MatchSavoir
            </h2>
            <p className="mt-2 text-gray-400">
              Créez votre compte en quelques étapes simples
            </p>
          </div>
          
          <SignupForm />
        </div>
      </div>
    </div>
  );
}