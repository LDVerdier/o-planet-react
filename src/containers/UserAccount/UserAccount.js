import { connect } from 'react-redux';
import UserAccount from 'src/components/UserAccount/UserAccount';
import { setShowUserData, resetUpdateUserForm } from 'src/actions/users';

const mapStateToProps = (state, ownProps) => ({
  showUserData: state.users.showUserData,
  showUserForm: state.users.showUserForm,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setShowUserData: (boolean, name) => {
    dispatch(setShowUserData(boolean, name));
  },
  resetUpdateUserForm: () => {
    dispatch(resetUpdateUserForm());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
