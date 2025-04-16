import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProfessionalDetailPage from './pages/ProfessionalDetailPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recherche" element={<SearchPage />} />
            <Route path="/professionnels/:id" element={<ProfessionalDetailPage />} />
            {/* Ajoutez d'autres routes au besoin */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
