import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface Formation {
  id: number;
  title: string;
  instructor: string;
  price: number;
  duration: string;
  startDate: string;
  endDate: string;
  type: string;
  location: string;
  instructorImage: string;
}

export interface SearchParams {
  query?: string;
  location?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
}

export const getFormations = async (params: SearchParams = {}) => {
  try {
    const response = await axios.get(`${API_URL}/formations`, { params });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des formations' + error);
  }
};

export const getFormationById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/formations/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Formation non trouvée' + error);
  }
};
