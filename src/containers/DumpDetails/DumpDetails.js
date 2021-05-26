import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DumpDetails from 'src/components/DumpDetails/DumpDetails';

import {
  loadDumpByIdApi, deleteDumpApi, sendRemovalToApi, validateDumpApi,
} from 'src/actions/dumps';

const mapStateToProps = (state) => ({
  formSubmitted: state.dumps.formSubmitted,
  userId: state.users.userData.id,
  isLogged: state.users.isLogged,
  wastesList: state.dumps.wastesList,
  ...state.dumps.currentDump,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch, ownProps) => ({
  loadDumpByIdApi: () => {
    const dumpId = ownProps.match.params.id;
    dispatch(loadDumpByIdApi(dumpId));
  },
  deleteDump: () => {
    dispatch(deleteDumpApi());
  },
  validateDump: () => {
    dispatch(validateDumpApi());
  },
  sendRemovalToApi: (timestamp) => {
    dispatch(sendRemovalToApi(timestamp));
  },
});

// component is enhanced with properties taken from the store (redux)
const container = connect(mapStateToProps, mapDispatchToProps)(DumpDetails);

// enhanced component is "again" enhanced with "withRouter"
// -> it completes the "ownProps" with the routing match details :
// history, location, match...
const containerWithRouter = withRouter(container);

export default containerWithRouter;
