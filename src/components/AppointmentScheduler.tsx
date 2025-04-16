import React, { useState } from 'react';
import { Professionnel, Disponibilite } from '../data/mockData';

interface AppointmentSchedulerProps {
  professionnel: Professionnel;
}

type TimeSlot = {
  time: string;
  available: boolean;
};

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ professionnel }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  
  // Générer les dates disponibles (7 jours à partir d'aujourd'hui)
  const getDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };
  
  // Formater le jour de la semaine en français
  const formatDayOfWeek = (date: Date) => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days[date.getDay()];
  };
  
  // Formater la date (jour/mois)
  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };
  
  // Obtenir les créneaux pour un jour donné
  const getTimeSlots = (date: Date): TimeSlot[] => {
    const dayOfWeek = formatDayOfWeek(date);
    
    // Trouver les disponibilités correspondantes au jour de la semaine
    const dayAvailability = professionnel.disponibilites.find(
      (dispo) => dispo.jour === dayOfWeek
    );
    
    if (!dayAvailability) {
      return [];
    }
    
    // Simuler des créneaux horaires basés sur les plages disponibles
    const allSlots: TimeSlot[] = [];
    
    dayAvailability.creneaux.forEach((creneau) => {
      const [start, end] = creneau.split(' - ');
      
      const startHour = parseInt(start.split(':')[0]);
      const startMinute = parseInt(start.split(':')[1]);
      const endHour = parseInt(end.split(':')[0]);
      const endMinute = parseInt(end.split(':')[1]);
      
      // Créer des créneaux de 30 minutes
      let currentHour = startHour;
      let currentMinute = startMinute;
      
      while (
        currentHour < endHour || 
        (currentHour === endHour && currentMinute < endMinute)
      ) {
        const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
        
        // Simuler aléatoirement si un créneau est disponible ou non
        const isAvailable = Math.random() > 0.3; // 70% de chance d'être disponible
        
        allSlots.push({
          time: timeString,
          available: isAvailable
        });
        
        // Avancer de 30 minutes
        currentMinute += 30;
        if (currentMinute >= 60) {
          currentHour += 1;
          currentMinute = 0;
        }
      }
    });
    
    return allSlots;
  };
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };
  
  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleBooking = () => {
    setIsConfirmationVisible(true);
  };
  
  const timeSlots = getTimeSlots(selectedDate);
  const dates = getDates();
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Prendre rendez-vous</h3>
      
      {/* Sélecteur de date */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Sélectionnez une date</h4>
        <div className="grid grid-cols-7 gap-2">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all ${
                selectedDate.toDateString() === date.toDateString()
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <span className="text-xs font-medium mb-1">
                {formatDayOfWeek(date).slice(0, 3)}
              </span>
              <span className="text-sm font-bold">{formatDate(date)}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Sélecteur d'heure */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Choisissez un horaire pour {formatDayOfWeek(selectedDate)} {formatDate(selectedDate)}
        </h4>
        
        {timeSlots.length === 0 ? (
          <p className="text-gray-500 italic">
            Aucun créneau disponible pour cette date
          </p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                disabled={!slot.available}
                onClick={() => slot.available && handleTimeClick(slot.time)}
                className={`py-2 px-3 rounded-lg text-center text-sm transition-colors ${
                  selectedTime === slot.time
                    ? 'bg-blue-600 text-white'
                    : slot.available
                    ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Bouton de réservation */}
      <button
        onClick={handleBooking}
        disabled={!selectedTime}
        className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors ${
          selectedTime
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Réserver ce créneau
      </button>
      
      {/* Modal de confirmation */}
      {isConfirmationVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Rendez-vous confirmé !</h3>
              <p className="text-gray-600">
                Votre rendez-vous avec {professionnel.nom} est confirmé pour le{' '}
                {formatDayOfWeek(selectedDate)} {formatDate(selectedDate)} à {selectedTime}.
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Vous recevrez prochainement un email de confirmation avec tous les détails de votre rendez-vous.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setIsConfirmationVisible(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Fermer
              </button>
              <button
                onClick={() => setIsConfirmationVisible(false)}
                className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Voir mes rendez-vous
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentScheduler;
