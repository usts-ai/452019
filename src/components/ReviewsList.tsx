import React from 'react';
import { Avis } from '../data/mockData';

interface ReviewsListProps {
  avis: Avis[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ avis }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Avis clients ({avis.length})</h3>
      
      {avis.length === 0 ? (
        <p className="text-gray-500 italic">Aucun avis pour le moment</p>
      ) : (
        <div className="space-y-4">
          {avis.map((avis) => (
            <div key={avis.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start">
                <img 
                  src={avis.avatar} 
                  alt={`Avatar de ${avis.nom}`} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-gray-900">{avis.nom}</h4>
                    <span className="text-sm text-gray-500">{avis.date}</span>
                  </div>
                  
                  <div className="flex mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg 
                        key={i}
                        className={`h-5 w-5 ${i < avis.note ? 'text-yellow-400' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-gray-700">{avis.commentaire}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4">
        <button className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Voir plus d'avis
        </button>
      </div>
    </div>
  );
};

export default ReviewsList;
