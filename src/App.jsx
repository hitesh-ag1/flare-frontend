import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SiteForm from './components/SiteForm';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/datasite" element={<SiteForm />} />
        </Routes>
      </Router>
  )
}

export default App
