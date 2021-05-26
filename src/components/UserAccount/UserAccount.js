import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
} from 'semantic-ui-react';
import UserAccountData from 'src/containers/UserAccount/UserAccountData';

const UserAccount = ({ showUserData, setShowUserData, resetUpdateUserForm }) => {
  const handleCloseUserDataClick = () => {
    setShowUserData(false, 'showUserData');
    setShowUserData(false, 'showUserForm');
    resetUpdateUserForm();
  };
  return (
    <div
      onClick={handleCloseUserDataClick}
      className={`user-modal__background ${showUserData ? '' : 'user-modal__background--hidden'}`}
    >
      <div
        className="user-modal__container"
        onClick={(event) => event.stopPropagation()}
      >
        <Icon
          className="user-modal__container__close-btn"
          color="grey"
          name="cancel"
          size="big"
          onClick={handleCloseUserDataClick}
        />
        <UserAccountData />
      </div>
    </div>
  );
};

export default UserAccount;

UserAccount.propTypes = {
  showUserData: PropTypes.bool.isRequired,
  setShowUserData: PropTypes.func.isRequired,
  resetUpdateUserForm: PropTypes.func.isRequired,
};
