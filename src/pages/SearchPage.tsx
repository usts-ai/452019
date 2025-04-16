import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ProfessionalCard from '../components/ProfessionalCard';
import { professionnels, Professionnel } from '../data/mockData';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const initialQuery = queryParams.get('q') || '';
  const initialVille = queryParams.get('ville') || '';
  const initialMetier = queryParams.get('metier') || '';
  
  const [searchResults, setSearchResults] = useState<Professionnel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('recommandé');
  
  useEffect(() => {
    // Simuler un chargement
    setIsLoading(true);
    
    setTimeout(() => {
      // Filtrer les résultats en fonction des paramètres de recherche
      let results = [...professionnels];
      
      if (initialQuery) {
        results = results.filter(pro => 
          pro.nom.toLowerCase().includes(initialQuery.toLowerCase()) ||
          pro.description.toLowerCase().includes(initialQuery.toLowerCase()) ||
          pro.specialites.some(s => s.toLowerCase().includes(initialQuery.toLowerCase()))
        );
      }
      
      if (initialVille) {
        results = results.filter(pro => 
          pro.ville.toLowerCase().includes(initialVille.toLowerCase()) ||
          pro.codePostal.includes(initialVille)
        );
      }
      
      if (initialMetier) {
        results = results.filter(pro => 
          pro.metier.toLowerCase() === initialMetier.toLowerCase()
        );
      }
      
      // Trier les résultats
      if (sortOption === 'recommandé') {
        results.sort((a, b) => b.noteGlobale - a.noteGlobale);
      } else if (sortOption === 'prix-asc') {
        results.sort((a, b) => a.tarifHoraire - b.tarifHoraire);
      } else if (sortOption === 'prix-desc') {
        results.sort((a, b) => b.tarifHoraire - a.tarifHoraire);
      }
      
      setSearchResults(results);
      setIsLoading(false);
      
      // Définir les filtres actifs pour l'affichage
      const filters = [];
      if (initialVille) filters.push(`Ville: ${initialVille}`);
      if (initialMetier) filters.push(`Métier: ${initialMetier}`);
      if (initialQuery) filters.push(`Recherche: "${initialQuery}"`);
      setActiveFilters(filters);
      
    }, 800); // Simuler un délai de chargement
  }, [initialQuery, initialVille, initialMetier, sortOption]);
  
  const removeFilter = (filter: string) => {
    const newParams = new URLSearchParams(location.search);
    
    if (filter.startsWith('Ville:')) {
      newParams.delete('ville');
    } else if (filter.startsWith('Métier:')) {
      newParams.delete('metier');
    } else if (filter.startsWith('Recherche:')) {
      newParams.delete('q');
    }
    
    window.history.replaceState({}, '', `${location.pathname}?${newParams.toString()}`);
    window.location.reload();
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <SearchBar 
            fullWidth 
            showAdvanced 
            className="mb-6" 
          />
          
          {/* Filtres actifs */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {activeFilters.map((filter, index) => (
                <div 
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                >
                  {filter}
                  <button 
                    onClick={() => removeFilter(filter)}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                onClick={() => {
                  window.history.replaceState({}, '', location.pathname);
                  window.location.reload();
                }}
              >
                Effacer tous les filtres
              </button>
            </div>
          )}
        </div>
        
        {/* Résultats de recherche */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {isLoading 
                ? 'Recherche en cours...' 
                : `${searchResults.length} professionnel(s) trouvé(s)`
              }
            </h2>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 whitespace-nowrap">Trier par:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border-gray-300 rounded-md text-gray-700 py-2"
              >
                <option value="recommandé">Recommandés</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
              </select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="py-12 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Recherche en cours...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((professionnel) => (
                <ProfessionalCard 
                  key={professionnel.id} 
                  professionnel={professionnel} 
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun professionnel trouvé
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Essayez d'élargir votre recherche ou de modifier vos critères pour trouver plus de résultats.
              </p>
            </div>
          )}
          
          {searchResults.length > 0 && searchResults.length % 3 === 0 && (
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center mx-auto">
                <span>Voir plus de résultats</span>
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
