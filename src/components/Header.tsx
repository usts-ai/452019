import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-xl font-bold tracking-tight">MonAnnuairePro</span>
          </Link>

          {/* Menu pour desktop */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-200 transition-colors font-medium">Accueil</Link>
            <Link to="/recherche" className="hover:text-blue-200 transition-colors font-medium">Rechercher</Link>
            <Link to="/professionnels" className="hover:text-blue-200 transition-colors font-medium">Professionnels</Link>
          </nav>

          {/* Bouton de connexion pour desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="px-4 py-2 rounded-full bg-white text-indigo-700 font-semibold hover:bg-blue-50 transition-all transform hover:scale-105">
              Connexion
            </Link>
          </div>

          {/* Menu hamburger pour mobile */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen 
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-3">
            <Link to="/" className="block hover:bg-blue-700 px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
              Accueil
            </Link>
            <Link to="/recherche" className="block hover:bg-blue-700 px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
              Rechercher
            </Link>
            <Link to="/professionnels" className="block hover:bg-blue-700 px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
              Professionnels
            </Link>
            <Link to="/login" className="block bg-white text-indigo-700 font-medium px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
              Connexion
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
