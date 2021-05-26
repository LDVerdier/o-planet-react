/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

import ConfirmModal from 'src/components/Modals/ConfirmModal';

import './userAccount.scss';

const UserAccountData = ({
  email,
  userAlias,
  firstname,
  lastname,
  deleteAccount,
  showUserForm,
  editField,
  setShowUserData,
  updateAccount,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleClickDelete = () => {
    removeCookie('jwt');
    deleteAccount();
  };

  return (
    <div
      className="user"
    >
      <h2 className="user__title">{showUserForm ? 'Modifier mes informations personnelles' : 'Mes informations personnelles'}</h2>

      <form
        className="user__infos"
      >
        <div className="user__infos__field">
          <label className="user__infos__field__label" htmlFor="user-account__lastname">Nom de famille</label>
          <input
            value={lastname}
            onChange={(event) => editField('lastname', event.target.value)}
            id="user-account__lastname"
            className="input"
            disabled={!showUserForm}
          />
        </div>
        <div className="user__infos__field">
          <label className="user__infos__field__label" htmlFor="user-account__firstname">Prénom</label>
          <input
            value={firstname}
            onChange={(event) => editField('firstname', event.target.value)}
            id="user-account__firstname"
            className="input"
            disabled={!showUserForm}
          />
        </div>
        <div className="user__infos__field">
          <label className="user__infos__field__label" htmlFor="user-account__userAlias">Nom d'utilisateur</label>
          <input
            value={userAlias}
            onChange={(event) => editField('userAlias', event.target.value)}
            id="user-account__userAlias"
            className="input"
            disabled={!showUserForm}
          />
        </div>
        <div className="user__infos__field">
          <label className="user__infos__field__label" htmlFor="user-account__email">Email</label>
          <input
            value={email}
            onChange={(event) => editField('email', event.target.value)}
            id="user-account__email"
            className="input"
            disabled={!showUserForm}
          />
        </div>
      </form>

      <div className="user__actions">
        {!showUserForm && (
          <>
            <button type="button" className="user__actions__button btn btn-info" onClick={() => setShowUserData(true, 'showUserForm')}>Modifier mon compte</button>
            <ConfirmModal
              title="Suppression"
              text="Souhaitez-vous vraiment supprimer votre compte ? Pas de retour en arrière possible !"
              action={() => {
                handleClickDelete();
              }}
              cancelAction={() => {
                setShowUserData(true, 'showUserData');
              }}
            >
              <button type="button" className="user__actions__button btn btn-danger" onClick={() => setShowUserData(false, 'showUserData')}>Supprimer mon compte</button>
            </ConfirmModal>

          </>
        )}
        {showUserForm && (
          <>
            <button type="button" className="user__actions__button btn btn-success" onClick={() => updateAccount()}>Enregistrer les changements</button>
            <button type="button" className="user__actions__button btn" onClick={() => setShowUserData(false, 'showUserForm')}>Quitter sans enregistrer</button>
          </>
        )}

      </div>
    </div>
  );
};

export default UserAccountData;

UserAccountData.propTypes = {
  email: PropTypes.string.isRequired,
  userAlias: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  showUserForm: PropTypes.bool.isRequired,
  editField: PropTypes.func.isRequired,
  setShowUserData: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired,
};
