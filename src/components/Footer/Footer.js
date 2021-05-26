import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => (
  <div className="footer">
    <div className="footer__menu">
      <p className="footer__menu__copyright"> O'Planet &#xA9; 2021</p>
      <Link to="/team" className="footer__menu__links" href="">Qui Sommes Nous ?</Link>
      <Link to="/faq" className="footer__menu__links" href="">Foire aux Questions</Link>
    </div>
  </div>
);

export default Footer;
