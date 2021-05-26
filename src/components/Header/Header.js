import React from 'react';
import './header.scss';
import logo from 'src/assets/img/logo.png';

import Banner from 'src/containers/Header/Banner';
import Stats from 'src/containers/Stats/Stats';
import LoginButton from 'src/containers/LoginButton/LoginButton';
import { NavLink, useLocation, useHistory } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const shouldBeDisplayed = location.pathname === '/';
  const history = useHistory();
  return (
    <>
      <div className="header__top">
        <div className="header__top__links">
          <span className="header__top__links__logo" onClick={() => history.push('/')}>O'Planet</span>
          {/* <img className="header__top__links__logo" alt="logo" src={logo} onClick={() => history.push('/')} /> */}
          <NavLink activeClassName="selected" to="/dump/create" className="header__top__links__element">Signaler une décharge</NavLink>
          <NavLink activeClassName="selected" to="/team" className="header__top__links__element">Qui sommes-nous ?</NavLink>
          <NavLink activeClassName="selected" to="/faq" className="header__top__links__element">Foire aux questions</NavLink>
        </div>
        <LoginButton />
      </div>
      <header className="header">
        {shouldBeDisplayed && (
        <div className="header__bottom">
          <Banner />
          <Stats />
        </div>
        )}
      </header>
    </>
  );
};
export default Header;
