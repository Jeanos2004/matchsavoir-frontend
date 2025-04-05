"use client";

import React from 'react';
import Image from 'next/image';
import SignupForm from '@/components/SignUp/SignupForm';

export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1e2e] to-[#0f1219] p-4 md:p-8 flex items-center justify-center">
      <div className="bg-[#0f1219]/80 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden border border-[#2a3042]/70 flex flex-col md:flex-row w-full max-w-6xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 pointer-events-none" aria-hidden="true"></div>
        {/* Colonne de gauche - Texte et image */}
        <div className="md:w-1/2 relative min-h-[400px] md:min-h-[600px]">
          <Image 
            src="/images/signup-img.png" 
            alt="Inscription MatchSavoir" 
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f1219]/20 via-transparent to-[#0f1219]/80"></div>
        </div>
        
        {/* Colonne de droite - Formulaire */}
        <div className="md:w-1/2 p-8 md:p-12 relative z-10">
          <div className="text-center md:text-left mb-8 space-y-2">
            <div className="inline-block p-2 bg-secondary/10 rounded-lg mb-4">
              <svg className="w-8 h-8 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
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