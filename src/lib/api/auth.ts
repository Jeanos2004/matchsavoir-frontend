import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: 'apprenant' | 'formateur';
}

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error('Échec de la connexion. Veuillez vérifier vos identifiants.' + error);
  }
};

export const signup = async (data: SignupData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    return response.data;
  } catch (error) {
    throw new Error('Échec de l\'inscription. Veuillez réessayer.' + error);
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`);
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
};
