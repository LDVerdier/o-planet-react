import React from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import { useHistory } from 'react-router-dom';
import { Button, Dropdown, Icon } from 'semantic-ui-react';

import UserAccount from 'src/containers/UserAccount/UserAccount';

const LoginButton = ({
  isLogged, logout, userAlias, isAdmin, setShowUserData,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleLogoutButtonClick = () => {
    removeCookie('jwt');
    logout();
  };
  const history = useHistory();

  if (isLogged) {
    return (
      <>
        <Dropdown as={Button} className={`btn login-button ${isAdmin ? 'admin-badge-lg' : ''}`} text={`Bonjour ${userAlias}`}>
          <Dropdown.Menu direction="left">
            <Dropdown.Item icon="add circle" text="Nouvelle décharge..." onClick={() => history.push('/dump/create')} />
            <Dropdown.Item icon="user" text="Données personnelles" onClick={() => setShowUserData(true, 'showUserData')} />
            {isAdmin && (
              <Dropdown.Item
                onClick={() => window.open('http://ec2-54-82-219-80.compute-1.amazonaws.com/', '_blank')}
                className="admin-badge"
              >
                <Icon name="graduation" />Backoffice
              </Dropdown.Item>
            )}
            <Dropdown.Divider />
            <Dropdown.Item icon="log out" text="Se déconnecter" onClick={handleLogoutButtonClick} />
          </Dropdown.Menu>
        </Dropdown>
        <UserAccount />
      </>
    );
  }
  return (
    <button
      type="button"
      className="header__top__button btn"
      onClick={() => history.push('/login')}
    >
      Connexion
    </button>
  );
};

export default LoginButton;

LoginButton.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  userAlias: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  setShowUserData: PropTypes.func.isRequired,
};
