import React from 'react';
import { Link } from 'react-router-dom';

import './error.scss';

const Error = () => (
  <div className="error-page">
    <div className="error-page__content">
      <h1 className="error-page__content__title">OUPS ! ERREUR 404</h1>
      <div className="error-page__content__message">
        <p>AUCUNE DECHARGE SAUVAGE A NETTOYER ICI !</p>
        <p>TOUT EST DEJA CLEAN !</p>
        <p><Link to="/">CLIQUEZ ICI</Link> POUR RETOURNER A L'ACCUEIL !</p>
      </div>
    </div>
  </div>
);

export default Error;
