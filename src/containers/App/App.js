import { connect } from 'react-redux';
import App from 'src/components/App/App';
import {
  loadDumpsApi,
  resetDumpForm,
  loadStatsApi,
  loadEmergencyAndWaste,
} from 'src/actions/dumps';
import { saveJWT, loadUserData } from 'src/actions/users';

const mapStateToProps = (state) => ({
  formSubmitted: state.dumps.formSubmitted,
  isLogged: state.users.isLogged,
  jwtFromState: state.users.jwtFromState,
});

const mapDispatchToProps = (dispatch) => ({
  loadDumpsApi: () => {
    dispatch(loadDumpsApi());
  },
  loadStatsApi: () => {
    dispatch(loadStatsApi());
  },
  resetDumpForm: () => {
    dispatch(resetDumpForm());
  },
  saveJWT: (token) => {
    dispatch(saveJWT(token));
  },
  loadUserData: () => {
    dispatch(loadUserData());
  },
  loadEmergencyAndWaste: () => {
    dispatch(loadEmergencyAndWaste());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
