import { connect } from 'react-redux';
import HomePageMap from 'src/components/HomePage/HomePageMap';

import { removeCleanDumps } from 'src/selectors/dumps';

const mapStateToProps = (state) => ({
  dumpsList: removeCleanDumps(state.dumps.list, state.filters.hideCleanedDumps),
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  // loadDumpsByCoordinates: (latitude, longitude) => {
  //   dispatch(loadDumpsByCoordinates(latitude, longitude));
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageMap);
