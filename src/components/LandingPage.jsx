import React from 'react';
import logo from '../assets/logo.png';

const LandingPage = () => {
  return (
    <div class="flex">
      <div class="flex-auto w-64 left-align">
        Welcome to My Landing Page!
      </div>
      <div class="flex-auto w-64">
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default LandingPage;