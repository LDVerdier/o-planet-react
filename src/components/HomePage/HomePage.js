import React from 'react';
import Dumps from 'src/containers/Dumps/Dumps';
import HomePageMap from 'src/containers/HomePage/HomePageMap';
import './homePage.scss';

const HomePage = () => (
  <div className="home-page">
    <HomePageMap />
    <Dumps />
  </div>
);

export default HomePage;
