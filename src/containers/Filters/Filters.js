import { connect } from 'react-redux';
import Filters from 'src/components/Filters/Filters';
import {
  resetFilters,
  loadDumpsWithFiltersApi,
  toggleHideCleanedDumps,
  setUserCoordinates,
  updateFilter,
} from 'src/actions/filters';

const mapStateToProps = (state) => ({
  ...state.filters,
});

const mapDispatchToProps = (dispatch) => ({
  resetFilters: () => {
    dispatch(resetFilters());
  },
  applyFilters: () => {
    dispatch(loadDumpsWithFiltersApi());
  },
  toggleHideCleanedDumps: () => {
    dispatch(toggleHideCleanedDumps());
  },
  setUserCoordinates: (lat, lon) => {
    dispatch(setUserCoordinates(lat, lon));
  },
  updateFilter: (value, name) => {
    dispatch(updateFilter(value, name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
