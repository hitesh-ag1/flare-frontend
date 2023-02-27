import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SiteForm from './components/SiteForm';
import CodeEditor1 from './components/CodeEditor1';
import CodeEditor2 from './components/CodeEditor2';
import FLParams from './components/FLParams';
import StartTraining from './components/StartTraining';
import LiveTraining from './components/LiveTraining';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/datasite" element={<SiteForm />} />
          <Route path="/codeeditor1" element={<CodeEditor1 />} />
          <Route path="/codeeditor2" element={<CodeEditor2 />} />
          <Route path="/flparams" element={<FLParams />} />
          <Route path="/starttraining" element={<StartTraining />} />
          <Route path="/livetraining" element={<LiveTraining />} />
        </Routes>
      </Router>
  )
}

export default App
