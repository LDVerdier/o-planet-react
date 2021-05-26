import { connect } from 'react-redux';
import Login from 'src/components/Login/Login';
import { resetLoginForms } from 'src/actions/users';

const mapStateToProps = (state) => ({
  isLogged: state.users.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  resetLoginForms: () => {
    dispatch(resetLoginForms());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
