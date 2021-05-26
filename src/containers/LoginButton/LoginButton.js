import { connect } from 'react-redux';
import LoginButton from 'src/components/Header/LoginButton';
import { logout, setShowUserData } from 'src/actions/users';

// ici les props de lecture du state
const mapStateToProps = (state) => ({
  isLogged: state.users.isLogged,
  userAlias: state.users.userData.userAlias,
  isAdmin: state.users.userData.isAdmin,
});

// ici les props d'appel d'action = les fonctions
const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout());
  },
  setShowUserData: (boolean, name) => {
    dispatch(setShowUserData(boolean, name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
