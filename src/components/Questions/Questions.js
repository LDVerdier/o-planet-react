import React from 'react';
import { Link } from 'react-router-dom';
import './questions.scss';

const Questions = () => (
  <div className="faq">
    <h1 className="faq__title">Foire Aux Questions</h1>
    <div className="faq__questions">
      <details>
        <summary>Le concept O'Planet</summary>
        <p>
          O'Planet est un service en ligne permettant de signaler
          les décharges ou accumulations de déchets en France métropolitaine.
        </p>
        <p>
          Les utilisateurs peuvent signaler un endroit pollué
          en postant la photo et les coordonnées exactes de celui-ci.
        </p>
        <p>
          S'ils le souhaitent, les utilisateurs peuvent également organiser
          bénévolement une action citoyenne de nettoyage en offrant la possibilité
          à tous les utilisateurs d'y participer.
        </p>
      </details>
      <details>
        <summary>Comment s'inscrire ?</summary>
        <p>
          L'inscription est gratuite et ne nécessite
          qu'une adresse email ainsi que vos noms et prénoms.
        </p>
        <Link to="/login">Suivre ce lien pour s'inscrire</Link>
      </details>
      <details>
        <summary>Comment signaler une décharge sauvage ?</summary>
        <p>
          Tout utilisateur inscrit sur O'Planet a la possibilité de signaler une décharge sauvage.
        </p>
        <Link to="/dump/create">Signaler une décharge sauvage (nécessite un compte)</Link>
      </details>
      <details>
        <summary>Comment organiser ou participer à une action de ramassage ?</summary>
        <p>
          Lors du signalement d'une décharge sauvage,
          vous pouvez si vous le souhaitez créer une action citoyenne de ramassage.
        </p>
        <p>
          Vous pouvez également vous inscrire aux ramassages
          organisés par les autres utilisateurs.
        </p>
      </details>
    </div>
  </div>
);

export default Questions;
