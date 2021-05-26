import React from 'react';
import PropTypes from 'prop-types';

const SignUp = ({
  firstnameInput,
  lastnameInput,
  userAliasInput,
  emailInput,
  passwordInput,
  confirmPasswordInput,
  updateInput,
  signup,
  isLoading,
}) => {
  const handleInputChange = (event, inputName) => {
    const inputValue = event.target.value;
    updateInput(inputName, inputValue);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    signup();
  };

  return (
    // <form className={`login-form ${hide}`} onSubmit={handleSubmit}>
    <div className="form-container sign-up-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form__title">Créer un compte</h2>
        <input
          className="login-form__input"
          type="text"
          placeholder="Nom"
          value={lastnameInput}
          onChange={(event) => handleInputChange(event, 'lastnameInput')}
        />
        <input
          className="login-form__input"
          type="text"
          placeholder="Prénom"
          value={firstnameInput}
          onChange={(event) => handleInputChange(event, 'firstnameInput')}
        />
        <input
          className="login-form__input"
          type="text"
          placeholder="Nom d'utilisateur"
          value={userAliasInput}
          onChange={(event) => handleInputChange(event, 'userAliasInput')}
        />
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
        <input
          className="login-form__input"
          type="password"
          placeholder="Confirmez votre mot de passe"
          value={confirmPasswordInput}
          onChange={(event) => handleInputChange(event, 'confirmPasswordInput')}
        />
        <button
          disabled={isLoading}
          className="btn login-form__button"
          type="submit"
        >
          {isLoading ? 'Inscription en cours...' : 'Inscription'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;

SignUp.propTypes = {
  firstnameInput: PropTypes.string.isRequired,
  lastnameInput: PropTypes.string.isRequired,
  userAliasInput: PropTypes.string.isRequired,
  emailInput: PropTypes.string.isRequired,
  passwordInput: PropTypes.string.isRequired,
  confirmPasswordInput: PropTypes.string.isRequired,
  updateInput: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
