import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Banner = ({ isLogged }) => (
  <div className="header__bottom__banner">
    <div className="header__bottom__banner__content">
      <div className="header__bottom__banner__content__text">
        <h1 className="header__bottom__banner__content__text__title">Mobilisés contre les décharges sauvages</h1>
        <h2 className="header__bottom__banner__content__text__description">Avec O'Planet, vous pouvez signaler et trouver des dépôts d'ordure autour de vous, et organiser des actions citoyennes de ramassage de ces déchets.</h2>
      </div>
      <Link to={isLogged ? '/dump/create' : '/login'}><button type="button" className="header__bottom__banner__content__button btn">Signaler une décharge sauvage</button></Link>
    </div>
  </div>
);

export default Banner;

Banner.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};
