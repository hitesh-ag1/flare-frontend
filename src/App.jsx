import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SiteForm from './components/SiteForm';
import CodeEditor1 from './components/CodeEditor1';
import CodeEditor2 from './components/CodeEditor2';
import FLParams from './components/FLParams';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/datasite" element={<SiteForm />} />
          <Route path="/codeeditor1" element={<CodeEditor1 />} />
          <Route path="/codeeditor2" element={<CodeEditor2 />} />
          <Route path="/flparams" element={<FLParams />} />
        </Routes>
      </Router>
  )
}

export default App
