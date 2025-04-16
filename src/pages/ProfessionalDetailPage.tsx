import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { professionnels, Professionnel } from '../data/mockData';
import ReviewsList from '../components/ReviewsList';
import AppointmentScheduler from '../components/AppointmentScheduler';

const ProfessionalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [professional, setProfessional] = useState<Professionnel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('informations');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Simuler un chargement
    setIsLoading(true);
    
    setTimeout(() => {
      const foundProfessional = professionnels.find(p => p.id === Number(id));
      setProfessional(foundProfessional || null);
      setIsLoading(false);
      
      if (foundProfessional) {
        setSelectedImage(foundProfessional.photos[0]);
      }
      
      setTimeout(() => {
        setAnimateIn(true);
      }, 100);
    }, 800);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement en cours...</p>
        </div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-6"
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Professionnel non trouvé</h1>
          <p className="text-gray-600 mb-8">
            Le professionnel que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link
            to="/recherche"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour à la recherche
          </Link>
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
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <Link to="/recherche" className="hover:text-blue-600 transition-colors">Recherche</Link>
          <span className="mx-2">/</span>
          <Link to={`/recherche?metier=${professional.metier}`} className="hover:text-blue-600 transition-colors">
            {professional.metier}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-medium">{professional.nom}</span>
        </div>

        {/* En-tête du profil */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-800 px-6 py-4 text-white">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <img
                src={professional.logo}
                alt={`Logo de ${professional.nom}`}
                className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
              />
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold">{professional.nom}</h1>
                <p className="text-blue-100">{professional.metier} à {professional.ville}</p>
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(professional.noteGlobale)
                            ? 'text-yellow-400'
                            : i < professional.noteGlobale
                            ? 'text-yellow-300'
                            : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-white">
                    {professional.noteGlobale.toFixed(1)} ({professional.avis.length} avis)
                  </span>
                </div>
              </div>
              <div className="md:text-right space-y-2 md:space-y-4">
                <div className="flex items-center justify-end">
                  <svg className="h-5 w-5 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{professional.telephone}</span>
                </div>
                <div className="flex items-center justify-end">
                  <svg className="h-5 w-5 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-white">
                    {professional.tarifHoraire}€/heure
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation par onglets */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'informations'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('informations')}
            >
              Informations
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'photos'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('photos')}
            >
              Photos
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'avis'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('avis')}
            >
              Avis ({professional.avis.length})
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            {activeTab === 'informations' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">À propos</h2>
                <p className="text-gray-700 mb-6">{professional.description}</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Spécialités</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {professional.specialites.map((specialite, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {specialite}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Coordonnées</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex items-start">
                    <svg className="h-6 w-6 mt-0.5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-900">Adresse</h4>
                      <p className="text-gray-600">{professional.adresse}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="h-6 w-6 mt-0.5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-900">Téléphone</h4>
                      <p className="text-gray-600">{professional.telephone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="h-6 w-6 mt-0.5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-900">Email</h4>
                      <p className="text-gray-600">{professional.email}</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Horaires d'ouverture</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    {professional.disponibilites.map((dispo, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-medium text-gray-900">{dispo.jour}</span>
                        <div>
                          {dispo.creneaux.map((creneau, i) => (
                            <div key={i} className="text-right text-gray-600">
                              {creneau}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Photos</h2>
                
                {selectedImage && (
                  <div className="mb-6">
                    <img
                      src={selectedImage}
                      alt={`Photo de ${professional.nom}`}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-4 gap-4">
                  {professional.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(photo)}
                      className={`h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === photo ? 'border-blue-600 shadow-md' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`Miniature ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'avis' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <ReviewsList avis={professional.avis} />
              </div>
            )}
          </div>

          {/* Colonne latérale */}
          <div className="lg:col-span-1">
            <AppointmentScheduler professionnel={professional} />
            
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Partagez ce profil</h3>
              <div className="flex space-x-4">
                <button className="flex-1 flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                  Facebook
                </button>
                <button className="flex-1 flex items-center justify-center bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                  Twitter
                </button>
              </div>
              <button className="w-full mt-4 flex items-center justify-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Envoyer par email
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Besoin d'aide ?</h3>
              <p className="text-gray-700 mb-4">
                Des questions sur ce professionnel ou le processus de réservation ? 
                Contactez notre équipe de support.
              </p>
              <button className="w-full flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Contacter le support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetailPage;
