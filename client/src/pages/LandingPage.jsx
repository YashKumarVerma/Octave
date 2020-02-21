import React from 'react';
import LandingHeader from '../components/landing/LandingHeader';
import LandingGrid from '../components/landing/LandingGrid';

const LandingPage = () => (
  <div className="bg-black h-full cursor-default">
    <LandingHeader />
    <LandingGrid />
  </div>
);

export default LandingPage;
