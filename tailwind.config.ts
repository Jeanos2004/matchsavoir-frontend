import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        move: "move 5s linear infinite",
      },
      keyframes: {
        move: {
          "0%": { transform: "translateX(-200px)" },
          "100%": { transform: "translateX(200px)" },
        },
      },
      colors: {
        primary: {
          DEFAULT: '#4A90E2', // Bleu principal de la maquette
          light: '#68A6E8',   // Version plus claire pour les hovers
          dark: '#1a1e2e',    // Version plus sombre
        },
        secondary: {
          DEFAULT: '#E85D04', // Orange de la maquette
          light: '#FF7A1F',   // Version plus claire pour les hovers
          dark: '#C94E00',    // Version plus sombre
        },
        background: {
          DEFAULT: '#0F1219', // Fond très sombre de la maquette
          dark: '#080A0F',    // Version encore plus sombre
          card: '#1A1E2E',    // Couleur des cartes
          border: '#2A3042',  // Couleur des bordures
        },
      },
    },
  },
  plugins: [],
};

export default config;
