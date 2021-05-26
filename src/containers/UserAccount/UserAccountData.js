import { connect } from 'react-redux';
import UserAccountData from 'src/components/UserAccount/UserAccountData';
import {
  deleteAccount, editUserUpdateField, setShowUserData, updateAccount,
} from 'src/actions/users';

const mapStateToProps = (state) => ({
  userAlias: state.users.userUpdateForm.userAlias,
  email: state.users.userUpdateForm.email,
  firstname: state.users.userUpdateForm.firstname,
  lastname: state.users.userUpdateForm.lastname,
  password: state.users.userUpdateForm.password,
  repeatPassword: state.users.userUpdateForm.repeatPassword,
  showUserForm: state.users.showUserForm,
});

const mapDispatchToProps = (dispatch) => ({
  deleteAccount: () => {
    dispatch(deleteAccount());
  },
  updateAccount: () => {
    dispatch(updateAccount());
  },
  editField: (inputName, inputValue) => {
    dispatch(editUserUpdateField(inputName, inputValue));
  },
  setShowUserData: (boolean, name) => {
    dispatch(setShowUserData(boolean, name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountData);
