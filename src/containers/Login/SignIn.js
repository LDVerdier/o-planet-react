import { connect } from 'react-redux';
import SignIn from 'src/components/Login/SignIn';
import { updateSigninInput, login } from 'src/actions/users';

// "read-only" props
const mapStateToProps = (state, ownProps) => ({
  // comes from the Login component, directly given props
  display: ownProps.display,

  // comes from the state : second source of props
  emailInput: state.users.signin.emailInput,
  passwordInput: state.users.signin.passwordInput,
  isLoading: state.users.signin.isLoading,
});

// "write" props
const mapDispatchToProps = (dispatch) => ({
  updateInput: (inputName, inputValue) => {
    dispatch(updateSigninInput(inputName, inputValue));
  },
  login: () => {
    dispatch(login());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
