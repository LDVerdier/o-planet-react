/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React from 'react';

import {
  LOGIN,
  login,
  saveUser,
  LOAD_USER_DATA,
  loadUserData,
  stopLoading,
  SIGNUP,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
  LOGOUT,
  saveJWT,
  logout,
  setShowUserData,
} from 'src/actions/users';

import axiosService from 'src/services/api';
import toastService from 'src/services/toast';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      // prepare parameters for API call
      const url = '/login_check';
      const errors = [];
      let { emailInput, passwordInput } = store.getState().users.signin;

      // do not check for errors if origin === signup -> already checked
      if (action.origin === 'signin') {
        if (!emailInput) {
          errors.push('Veuillez saisir votre email !');
        }
        if (!passwordInput) {
          errors.push('Veuillez saisir votre mot de passe !');
        }
      }

      // if (passwordInput.length < 8) {
      //   errors.push('Le mot de passe doit contenir au moins 8 caractères !');
      // }

      // log using the signup form if the login comes from him
      if (action.origin === 'signup') {
        emailInput = store.getState().users.signup.emailInput;
        passwordInput = store.getState().users.signup.passwordInput;
      }

      const payload = {
        username: emailInput,
        password: passwordInput,
      };

      const thenCallback = (response) => {
        const { token } = response.data;

        // store the token in the state
        store.dispatch(saveJWT(token));
      };

      const errorCallback = (error) => {
        toastService.error('Identifiants invalides');
        store.dispatch(stopLoading());
      };

      if (errors.length === 0) {
        axiosService.post(url, payload, thenCallback, errorCallback);
        next(action);
      }
      else {
        // allows to have multiline in the toast
        const errorsAsJsx = errors.map((errorEl) => (
          <div key={errorEl}>
            {errorEl}
          </div>
        ));
        toastService.error(<div>{errorsAsJsx}</div>);
      }

      break;
    }

    case LOAD_USER_DATA: {
      // store the token into the service
      axiosService.setJWT(store.getState().users.jwtFromState);
      const url = '/v1/users/profile';

      const thenCallback = (response) => {
        const userData = response.data;
        store.dispatch(saveUser(userData));
      };

      const errorCallback = (error) => {
        toastService.error();
        store.dispatch(stopLoading);
      };

      axiosService.get(url, thenCallback, errorCallback);
      break;
    }

    case SIGNUP: {
      // prepare parameters for API call
      const url = '/v1/users/register';

      const errors = [];

      const {
        lastnameInput,
        firstnameInput,
        userAliasInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
      } = store.getState().users.signup;

      if (!lastnameInput) {
        errors.push('Veuillez saisir votre nom !');
      }
      if (!firstnameInput) {
        errors.push('Veuillez saisir votre prénom !');
      }
      if (!userAliasInput) {
        errors.push('Veuillez saisir un nom d\'utilisateur !');
      }
      if (!emailInput) {
        errors.push('Veuillez saisir votre email !');
      }
      if (!passwordInput) {
        errors.push('Veuillez saisir votre mot de passe !');
      }
      if (!confirmPasswordInput) {
        errors.push('Veuillez confirmer votre mot de passe !');
      }
      if (passwordInput !== confirmPasswordInput) {
        errors.push('Le mot de passe et la confirmation doivent être identiques !');
      }

      const payload = {
        lastname: lastnameInput,
        firstname: firstnameInput,
        userAlias: userAliasInput,
        email: emailInput,
        password: passwordInput,
      };

      const thenCallback = (response) => {
        store.dispatch(login('signup'));
      };

      const errorCallback = (error) => {
        toastService.error('Erreur lors de la création du compte.');
        store.dispatch(stopLoading());
      };

      if (errors.length === 0) {
        axiosService.post(url, payload, thenCallback, errorCallback);
        next(action);
      }
      else {
        // allows to have multiline in the toast
        const errorsAsJsx = errors.map((errorEl) => (
          <div key={errorEl}>
            {errorEl}
          </div>
        ));
        toastService.error(<div>{errorsAsJsx}</div>);
      }
      break;
    }

    case UPDATE_ACCOUNT: {
      const url = '/v1/users/profile';

      const {
        lastname, firstname, userAlias, email,
      } = store.getState().users.userUpdateForm;
      const payload = {
        lastname: lastname,
        firstname: firstname,
        userAlias: userAlias,
        email: email,
      };

      const thenCallback = (response) => {
        toastService.info('Modification enregistrée !');
        store.dispatch(loadUserData());
        store.dispatch(setShowUserData(false, 'showUserForm'));
      };

      const errorCallback = (error) => {
        toastService.error('Erreur lors de la mise à jour du compte !');
      };
      axiosService.patch(url, payload, thenCallback, errorCallback);
      next(action);
      break;
    }

    case DELETE_ACCOUNT: {
      const url = '/v1/users/profile';

      const thenCallback = (response) => {
        toastService.info('Votre compte a bien été supprimé.');
        store.dispatch(logout());
      };

      const errorCallback = (error) => {
        toastService.error('Erreur lors de la suppression du compte !');
      };

      axiosService.del(url, thenCallback, errorCallback);
      break;
    }
    case LOGOUT:
      // clear the JWT token
      axiosService.setJWT('');
      toastService.info('Déconnexion réussie !', { autoClose: 1500 });
      next(action);
      break;

    default:
      next(action);
  }
};
