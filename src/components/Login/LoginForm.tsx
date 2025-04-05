'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/api/auth';

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur vient de s'inscrire
    const registered = searchParams?.get('registered');
    if (registered === 'true') {
      setShowSuccessMessage(true);
      // Masquer le message après 5 secondes
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Effacer l'erreur lorsque l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validation de l'email
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      });
      
      if (response.success) {
        setShowSuccessMessage(true);
        
        // Réinitialiser le formulaire
        setFormData({
          email: '',
          password: '',
          rememberMe: formData.rememberMe
        });
        
        // Redirection vers le tableau de bord après un court délai
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        // Gestion des erreurs spécifiques
        if (response.message?.toLowerCase().includes('mot de passe')) {
          setErrors(prev => ({ ...prev, password: 'Mot de passe incorrect' }));
        } else if (response.message?.toLowerCase().includes('email')) {
          setErrors(prev => ({ ...prev, email: 'Email non reconnu' }));
        } else {
          setErrors(prev => ({ ...prev, form: response.message || 'Une erreur est survenue' }));
        }
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setErrors({
        form: 'Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showSuccessMessage && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded mb-4">
          Inscription réussie ! Vous pouvez maintenant vous connecter.
        </div>
      )}
      
      {errors.form && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.form}
        </div>
      )}
      
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          Adresse email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-[#1a1e2e] border ${errors.email ? 'border-red-500' : 'border-[#2a3042]'} text-white rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent`}
          placeholder="Votre adresse email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email}</p>
        )}
      </div>
      
      {/* Mot de passe */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
          Mot de passe
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-[#1a1e2e] border ${errors.password ? 'border-red-500' : 'border-[#2a3042]'} text-white rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent pr-10`}
            placeholder="Votre mot de passe"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
          >
            {showPassword ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password}</p>
        )}
      </div>
      
      {/* Options supplémentaires */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 text-secondary focus:ring-secondary bg-[#1a1e2e] border-[#2a3042] rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">
            Se souvenir de moi
          </label>
        </div>
        
        <div className="text-sm">
          <Link href="/mot-de-passe-oublie" className="text-secondary hover:text-secondary-light">
            Mot de passe oublié?
          </Link>
        </div>
      </div>
      
      {/* Bouton de soumission */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#e85d04] hover:bg-[#f17425] text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </div>
      
      {/* Séparateur */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#2a3042]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[#0f1219] text-gray-400">
            Ou connectez-vous avec
          </span>
        </div>
      </div>
      
      {/* Boutons de connexion sociale */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-2 border border-[#2a3042] rounded-md bg-[#1a1e2e] text-sm font-medium text-gray-300 hover:bg-[#252a3d] hover:border-secondary transition-colors duration-300"
        >
          <svg className="h-5 w-5" fill="#4285F4" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
          </svg>
          Google
        </button>
        
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-2 border border-[#2a3042] rounded-md bg-[#1a1e2e] text-sm font-medium text-gray-300 hover:bg-[#252a3d] hover:border-secondary transition-colors duration-300"
        >
          <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M24,12.073c0,-5.8 -4.701,-10.5 -10.5,-10.5c-5.799,0 -10.5,4.7 -10.5,10.5c0,5.24 3.84,9.584 8.86,10.373v-7.337h-2.666v-3.036h2.666v-2.314c0,-2.633 1.568,-4.086 3.966,-4.086c1.15,0 2.351,0.205 2.351,0.205v2.585h-1.324c-1.304,0 -1.711,0.81 -1.711,1.64v1.97h2.912l-0.465,3.036h-2.447v7.337c5.02,-0.789 8.859,-5.133 8.859,-10.373Z" />
          </svg>
          Facebook
        </button>
      </div>
      
      {/* Lien vers la page d'inscription */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400">
          Vous n&apos;avez pas de compte ?{' '}
          <Link href="/inscription" className="font-medium text-secondary hover:text-secondary-light transition-colors duration-300">
            Créer un compte
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;