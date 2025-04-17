import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { professionnels } from '../data/mockData';
import ProfessionalCard from '../components/ProfessionalCard';

const ProfessionalDetailPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Simulation d'un chargement
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setAnimateIn(true);
      }, 100);
    }, 500);
  }, []);

  // Affichage d'un indicateur de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des professionnels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div 
        className={`container mx-auto px-4 transition-opacity duration-500 ${
          animateIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* En-tête de la page */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos professionnels à votre service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre sélection de professionnels qualifiés prêts à répondre à tous vos besoins.
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <select className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                <option value="">Toutes les villes</option>
                <option value="paris">Paris</option>
                <option value="lyon">Lyon</option>
                <option value="marseille">Marseille</option>
                <option value="toulouse">Toulouse</option>
                <option value="nantes">Nantes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Métier</label>
              <select className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tous les métiers</option>
                <option value="electricien">Électricien</option>
                <option value="plombier">Plombier</option>
                <option value="menuisier">Menuisier</option>
                <option value="peintre">Peintre</option>
                <option value="jardinier">Jardinier</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note minimale</label>
              <select className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                <option value="">Toutes les notes</option>
                <option value="5">★★★★★ (5)</option>
                <option value="4">★★★★☆ (4+)</option>
                <option value="3">★★★☆☆ (3+)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trier par</label>
              <select className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                <option value="note">Note (décroissante)</option>
                <option value="prix-asc">Prix (croissant)</option>
                <option value="prix-desc">Prix (décroissant)</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtrer les résultats
            </button>
          </div>
        </div>

        {/* Liste des professionnels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {professionnels.map((professionnel) => (
            <ProfessionalCard key={professionnel.id} professionnel={professionnel} />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
              1
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">
              2
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">
              3
            </button>
            <span className="px-3 py-2 text-gray-500">...</span>
            <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">
              8
            </button>
            <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetailPage;
