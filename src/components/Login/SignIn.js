import React from 'react';
import PropTypes from 'prop-types';

const SignIn = ({
  emailInput,
  passwordInput,
  updateInput,
  login,
  isLoading,
}) => {
  const handleInputChange = (event, inputName) => {
    const inputValue = event.target.value;
    updateInput(inputName, inputValue);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };
  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-form__title">Se connecter</h2>
        <input
          className="login-form__input"
          type="email"
          placeholder="Email (ex: stop-decharge@oplanet.com)"
          value={emailInput}
          onChange={(event) => handleInputChange(event, 'emailInput')}
        />
        <input
          className="login-form__input"
          type="password"
          placeholder="Mot de passe"
          value={passwordInput}
          onChange={(event) => handleInputChange(event, 'passwordInput')}
        />
        <button
          disabled={isLoading}
          className="btn login-form__button"
          type="submit"
        >
          {isLoading ? 'Connexion...' : 'Connexion'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;

SignIn.propTypes = {
  emailInput: PropTypes.string.isRequired,
  updateInput: PropTypes.func.isRequired,
  passwordInput: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
