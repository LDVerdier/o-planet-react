import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DumpForm from 'src/components/DumpDetails/DumpForm';
import {
  updateStandardInput,
  toggleWaste,
  toggleEmergency,
  editDump,
  resetDumpForm,
  updateDumpApi,
  postDumpApi,
} from 'src/actions/dumps';
import { getDumpIds } from 'src/selectors/dumps';

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;

  // regexp : only numbers between 0 and 9, at least one
  const regexp = /^[0-9]+$/;

  // verifiedId has a default value of -1
  let verifiedId = -1;

  // if no id provided at all assign 0
  if (id === undefined) {
    verifiedId = 0;
  }

  // if id only contains numbers and exists as a valid id, assign it to verifiedId
  else if (regexp.test(id) && getDumpIds(state.dumps.list).includes(parseInt(id, 10))) {
    verifiedId = parseInt(id, 10);
  }

  return {
    dumpId: verifiedId,
    emergenciesList: state.dumps.emergenciesList,
    wastesList: state.dumps.wastesList,
    formSubmitted: state.dumps.formSubmitted,
    ...state.dumps.dumpForm,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateStandardInput: (inputName, newInputValue) => {
    dispatch(updateStandardInput(inputName, newInputValue));
  },
  toggleWaste: (idValue) => {
    dispatch(toggleWaste(idValue));
  },
  toggleEmergency: (idValue) => {
    dispatch(toggleEmergency(idValue));
  },
  editDump: (dumpId) => {
    dispatch(editDump(dumpId));
  },
  resetDumpForm: (dumpId) => {
    dispatch(resetDumpForm(dumpId));
  },
  sendDumpToApi: (dumpId, file) => {
    if (dumpId) {
      dispatch(updateDumpApi(dumpId, file));
    }
    else {
      dispatch(postDumpApi(file));
    }
  },
});

const container = connect(mapStateToProps, mapDispatchToProps)(DumpForm);

const containerWithRouter = withRouter(container);

export default containerWithRouter;
