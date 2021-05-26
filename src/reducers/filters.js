import {
  RESET_FILTERS,
  TOGGLE_HIDE_CLEANED_DUMPS,
  SET_USER_COORDINATES,
  UPDATE_FILTER,
} from 'src/actions/filters';

const initialState = {
  emergency: 0,
  wastes: [],
  hideCleanedDumps: true,
  userCoordinates: {
    lat: 0,
    lon: 0,
  },
  userPositionChoice: 0,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET_FILTERS:
      return {
        ...initialState,
      };
    case TOGGLE_HIDE_CLEANED_DUMPS:
      return {
        ...state,
        hideCleanedDumps: !state.hideCleanedDumps,
      };
    case SET_USER_COORDINATES:
      return {
        ...state,
        userCoordinates: {
          lat: action.lat,
          lon: action.lon,
        },
      };
    case UPDATE_FILTER:
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
