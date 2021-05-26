import { connect } from 'react-redux';
import MapDraggableMarker from 'src/components/Map/MapDraggableMarker';
import { updateStandardInput } from 'src/actions/dumps';

const mapStateToProps = (state) => ({
  latitude: state.dumps.dumpForm.latitudeCoordinate,
  longitude: state.dumps.dumpForm.longitudeCoordinate,
});

const mapDispatchToProps = (dispatch) => ({
  updateStandardInput: (inputName, newInputValue) => {
    dispatch(updateStandardInput(inputName, newInputValue));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MapDraggableMarker);
