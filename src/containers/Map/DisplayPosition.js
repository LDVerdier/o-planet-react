import { connect } from 'react-redux';
import DisplayPosition from 'src/components/Map/DisplayPosition';
import { updateStandardInput } from 'src/actions/dumps';

const mapStateToProps = (state, ownProps) => ({
  map: ownProps.map,
  latitudeCoordinate: state.dumps.dumpForm.latitudeCoordinate,
  longitudeCoordinate: state.dumps.dumpForm.longitudeCoordinate,
});

const mapDispatchToProps = (dispatch) => ({
  updateStandardInput: (inputName, newInputValue) => {
    dispatch(updateStandardInput(inputName, newInputValue));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPosition);
