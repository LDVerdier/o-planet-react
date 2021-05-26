import { connect } from 'react-redux';
import SignUp from 'src/components/Login/SignUp';
import {
  updateSignupInput,
  signup,
} from 'src/actions/users';

// "read-only" props
const mapStateToProps = (state, ownProps) => ({
  // comes from the Login component, directly given props
  display: ownProps.display,
  // comes from the state : second source of props
  lastnameInput: state.users.signup.lastnameInput,
  firstnameInput: state.users.signup.firstnameInput,
  userAliasInput: state.users.signup.userAliasInput,
  emailInput: state.users.signup.emailInput,
  passwordInput: state.users.signup.passwordInput,
  confirmPasswordInput: state.users.signup.confirmPasswordInput,
  isLoading: state.users.signup.isLoading,
});

// "write" props
const mapDispatchToProps = (dispatch) => ({
  updateInput: (inputName, inputValue) => {
    // console.log('reçu : ', inputName, inputValue);
    dispatch(updateSignupInput(inputName, inputValue));
  },
  signup: () => {
    dispatch(signup());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
