"use client";

import React, { Suspense } from 'react';
import Image from 'next/image';
import LoginForm from '@/components/Login/LoginForm';
import { Loader2 } from 'lucide-react';

export default function ConnexionPage() {
  return (
    <div className="bg-gradient-to-br from-[#1a1e2e] to-[#0f1219] p-4 md:p-8 flex items-center justify-center">
      <div className="bg-[#0f1219]/80 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden border border-[#2a3042]/70 flex flex-col md:flex-row w-full max-w-6xl">
        {/* Colonne de gauche - Texte et image */}
        <div className="md:w-1/2 flex flex-col bg-motif text-white">
            
            <div className="relative w-full h-[100%]">
            <Image 
              src="/images/connexion-image.png" 
              alt="Connexion MatchSavoir" 
              fill
              /* style={{ objectFit: 'contain' }} */
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f1219]/50"></div>
          </div>
        </div>
          
          {/* Colonne de droite - Formulaire */}
          <div className="md:w-1/2 p-8 md:p-12 relative z-10">
            <div className="text-center md:text-left mb-8 space-y-2">
              <h2 className="text-2xl font-bold text-white">
                <span className="text-secondary">Connexion</span> à votre compte
              </h2>
              <p className="mt-2 text-gray-400">
                Entrez vos identifiants pour accéder à votre espace personnel
              </p>
            </div>
            
            <Suspense fallback={<div className="flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-secondary" /></div>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
  )
}