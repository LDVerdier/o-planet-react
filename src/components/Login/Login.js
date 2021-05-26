/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import SignIn from 'src/containers/Login/SignIn';
import SignUp from 'src/containers/Login/SignUp';
import './login.scss';

const Login = ({ resetLoginForms, isLogged }) => {
  if (isLogged) {
    return (
      <Redirect to="/" />
    );
  }
  useEffect(() => {
    resetLoginForms();
  }, []);

  const [rightPanelActive, setRightPanelActive] = useState(true);

  return (
    <div className="login-supercontainer">
      <div className={`login-container ${rightPanelActive ? 'right-panel-active' : ''}`}>
        <SignUp />
        <SignIn />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Heureux de vous revoir !</h1>
              <p>Saisissez vos identifiants pour vous connecter</p>
              <button
                onClick={() => setRightPanelActive(false)}
                type="button"
                className="btn btn-reverse"
              >
                Je me connecte
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Bienvenue !</h1>
              <p>Enregistrez vos informations personnelles et rejoignez-nous !</p>
              <button
                onClick={() => setRightPanelActive(true)}
                type="button"
                className="btn btn-reverse"
              >
                Je m'inscris
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="login-toggle btn btn-reverse"
        type="button"
        onClick={() => setRightPanelActive(!rightPanelActive)}
      >
        {rightPanelActive ? 'Je ne suis pas encore inscrit' : 'J\'ai déjà un compte'}
      </button>
    </div>
  );
};

export default Login;

Login.propTypes = {
  resetLoginForms: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
};
