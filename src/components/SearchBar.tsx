import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { villes, metiers } from '../data/mockData';

interface SearchBarProps {
  fullWidth?: boolean;
  showAdvanced?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  fullWidth = false, 
  showAdvanced = false,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [profession, setProfession] = useState('');
  const [isAdvancedVisible, setIsAdvancedVisible] = useState(showAdvanced);
  const [villesSuggestions, setVillesSuggestions] = useState<string[]>([]);
  const [metiersSuggestions, setMetiersSuggestions] = useState<string[]>([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (location.length > 1) {
      const filteredVilles = villes.filter(ville => 
        ville.toLowerCase().includes(location.toLowerCase())
      );
      setVillesSuggestions(filteredVilles.slice(0, 5));
    } else {
      setVillesSuggestions([]);
    }
  }, [location]);

  useEffect(() => {
    if (profession.length > 1) {
      const filteredMetiers = metiers.filter(metier => 
        metier.toLowerCase().includes(profession.toLowerCase())
      );
      setMetiersSuggestions(filteredMetiers.slice(0, 5));
    } else {
      setMetiersSuggestions([]);
    }
  }, [profession]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construire les paramètres de recherche
    const params = new URLSearchParams();
    if (searchTerm) params.append('q', searchTerm);
    if (location) params.append('ville', location);
    if (profession) params.append('metier', profession);
    
    // Naviguer vers la page de résultats avec les paramètres
    navigate(`/recherche?${params.toString()}`);
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 md:p-6 ${fullWidth ? 'w-full' : 'max-w-4xl'} ${className}`}>
      <form onSubmit={handleSearch}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Que recherchez-vous ?"
              className="pl-10 pr-4 py-3 w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <span>Rechercher</span>
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            onClick={() => setIsAdvancedVisible(!isAdvancedVisible)}
          >
            {isAdvancedVisible ? 'Masquer' : 'Afficher'} les filtres avancés
            <svg
              className={`ml-1 h-4 w-4 transform transition-transform ${isAdvancedVisible ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {isAdvancedVisible && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ville ou code postal</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Paris, 75001..."
                  className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              {villesSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200">
                  <ul>
                    {villesSuggestions.map((ville, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setLocation(ville);
                          setVillesSuggestions([]);
                        }}
                      >
                        {ville}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Métier ou service</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Plombier, Électricien..."
                  className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                />
              </div>
              {metiersSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200">
                  <ul>
                    {metiersSuggestions.map((metier, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setProfession(metier);
                          setMetiersSuggestions([]);
                        }}
                      >
                        {metier}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
