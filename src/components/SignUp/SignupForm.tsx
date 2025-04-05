'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signup } from '@/lib/api/auth';

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'apprenant',
    acceptTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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
    
    // Validation du prénom
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'Le prénom doit contenir au moins 2 caractères';
    }
    
    // Validation du nom
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Le nom doit contenir au moins 2 caractères';
    }
    
    // Validation de l'email
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else {
      const passwordErrors = [];
      if (formData.password.length < 8) passwordErrors.push('8 caractères minimum');
      if (!/[A-Z]/.test(formData.password)) passwordErrors.push('une majuscule');
      if (!/[a-z]/.test(formData.password)) passwordErrors.push('une minuscule');
      if (!/[0-9]/.test(formData.password)) passwordErrors.push('un chiffre');
      if (passwordErrors.length > 0) {
        newErrors.password = `Le mot de passe doit contenir : ${passwordErrors.join(', ')}`;
      }
    }
    
    // Validation de la confirmation du mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    // Validation des conditions d'utilisation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Vous devez accepter les conditions d'utilisation";
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
      const response = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        userType: formData.userType as 'apprenant' | 'formateur'
      });
      
      if (response.success) {
        // Réinitialiser le formulaire
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          userType: 'apprenant',
          acceptTerms: false
        });
        
        // Redirection vers la page de connexion avec message de succès
        router.push('/connexion?registered=true');
      } else {
        // Gestion des erreurs spécifiques de l'API
        if (response.message?.toLowerCase().includes('email')) {
          setErrors(prev => ({ ...prev, email: 'Cet email est déjà utilisé' }));
        } else {
          setErrors(prev => ({ ...prev, form: response.message || 'Une erreur est survenue' }));
        }
      }
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Boutons de connexion sociale */}
      <div className="space-y-3">
        <button
          type="button"
          className="w-full flex items-center justify-center px-4 py-2 border border-[#2a3042] rounded-md shadow-sm text-white bg-[#1a1e2e] hover:bg-[#2a3042] transition-colors duration-300"
          onClick={() => console.log('Google Sign Up clicked')}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
            />
          </svg>
          S&apos;inscrire avec Google
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-center px-4 py-2 border border-[#2a3042] rounded-md shadow-sm text-white bg-[#1a1e2e] hover:bg-[#2a3042] transition-colors duration-300"
          onClick={() => console.log('Facebook Sign Up clicked')}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
            />
          </svg>
          S&apos;inscrire avec Facebook
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#2a3042]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#0f1219] text-gray-400">Ou</span>
        </div>
      </div>
      {errors.form && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.form}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prénom */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
            Prénom
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-[#1a1e2e] border ${errors.firstName ? 'border-red-500' : 'border-[#2a3042]'} text-white rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent`}
            placeholder="Votre prénom"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
          )}
        </div>
        
        {/* Nom */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
            Nom
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-[#1a1e2e] border ${errors.lastName ? 'border-red-500' : 'border-[#2a3042]'} text-white rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent`}
            placeholder="Votre nom"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
          )}
        </div>
      </div>
      
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
          placeholder="Votre adresse email professionnelle"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email}</p>
        )}
      </div>
      
      {/* Type d'utilisateur */}
      <div>
        <label htmlFor="userType" className="block text-sm font-medium text-gray-300 mb-1">
          Je rejoins MatchSavoir en tant que
        </label>
        <select
          id="userType"
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-[#1a1e2e] border border-[#2a3042] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent"
        >
          <option value="apprenant">Apprenant</option>
          <option value="formateur">Formateur</option>
        </select>
        <p className="mt-1 text-xs text-gray-400">Vous pourrez modifier ce choix ultérieurement dans vos paramètres</p>
      </div>
      
      {/* Mot de passe */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
          Créez votre mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-[#1a1e2e] border ${errors.password ? 'border-red-500' : 'border-[#2a3042]'} text-white rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent`}
          placeholder="8 caractères minimum"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password}</p>
        )}
        {!errors.password && formData.password && (
          <p className="mt-1 text-xs text-gray-400">
            Un bon mot de passe contient des lettres, chiffres et caractères spéciaux
          </p>
        )}
      </div>
      
      {/* Confirmation du mot de passe */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
          Confirmez votre mot de passe
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-[#1a1e2e] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#2a3042]'} text-white rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent`}
          placeholder="Saisissez à nouveau votre mot de passe"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
        )}
      </div>
      
      {/* Conditions d'utilisation */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className={`h-4 w-4 text-secondary focus:ring-secondary bg-[#1a1e2e] border-[#2a3042] rounded ${errors.acceptTerms ? 'border-red-500' : ''}`}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="acceptTerms" className="font-medium text-gray-300">
            J&apos;accepte les <Link href="/conditions" className="text-secondary hover:text-secondary-light">conditions d&apos;utilisation</Link> et la <Link href="/confidentialite" className="text-secondary hover:text-secondary-light">politique de confidentialité</Link> de MatchSavoir
          </label>
          {errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-400">{errors.acceptTerms}</p>
          )}
        </div>
      </div>
      
      {/* Bouton de soumission */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#e85d04] hover:bg-[#f17425] text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Création de votre compte...' : 'Créer mon compte'}
        </button>
      </div>
      
      {/* Séparateur */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#2a3042]"></div>
        </div>
        
      </div>
      
      
      
      {/* Lien vers la page de connexion */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Vous avez déjà un compte ?{' '}
          <Link href="/connexion" className="font-medium text-secondary hover:text-secondary-light">
            Se connecter
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;