import React from 'react';
import { Link } from 'react-router-dom';
import { Professionnel } from '../data/mockData';

interface ProfessionalCardProps {
  professionnel: Professionnel;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professionnel }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
      <div className="relative">
        <img 
          src={professionnel.photos[0]} 
          alt={professionnel.nom} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 mt-3 ml-3 bg-blue-600 text-white text-sm font-semibold px-2 py-1 rounded-lg">
          {professionnel.metier}
        </div>
        <div className="absolute top-0 right-0 mt-3 mr-3 flex space-x-1 items-center bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded-lg">
          <svg className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{professionnel.noteGlobale.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="flex-1 p-5">
        <div className="flex items-center mb-3">
          <img 
            src={professionnel.logo} 
            alt={`Logo ${professionnel.nom}`} 
            className="w-14 h-14 rounded-full border-2 border-white shadow-md mr-3"
          />
          <div>
            <h3 className="text-lg font-bold text-gray-900">{professionnel.nom}</h3>
            <p className="text-sm text-gray-600">{professionnel.ville} ({professionnel.codePostal})</p>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm line-clamp-2 mb-4">
          {professionnel.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {professionnel.specialites.slice(0, 3).map((specialite, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
            >
              {specialite}
            </span>
          ))}
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Disponible sous 24h
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {professionnel.tarifHoraire}€/heure
        </div>
      </div>
      
      <div className="px-5 pb-5 pt-2 border-t border-gray-200">
        <div className="flex space-x-2">
          <Link 
            to={`/professionnels/${professionnel.id}`}
            className="flex-1 text-center bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Voir profil
          </Link>
          <Link 
            to={`/rendez-vous/${professionnel.id}`}
            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Prendre RDV
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
