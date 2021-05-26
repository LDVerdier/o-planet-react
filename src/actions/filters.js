// action type RESET_FILTERS
export const RESET_FILTERS = 'RESET_FILTERS';

// action creator resetFilters
export const resetFilters = () => ({
  type: RESET_FILTERS,
});

// action type LOAD_DUMPS_WITH_FILTERS_API
export const LOAD_DUMPS_WITH_FILTERS_API = 'LOAD_DUMPS_WITH_FILTERS_API';

// action creator loadDumpsWithFiltersApi
export const loadDumpsWithFiltersApi = () => ({
  type: LOAD_DUMPS_WITH_FILTERS_API,
});

// action type TOGGLE_HIDE_CLEANED_DUMPS
export const TOGGLE_HIDE_CLEANED_DUMPS = 'TOGGLE_HIDE_CLEANED_DUMPS';

// action creator toggleHideCleanedDumps
export const toggleHideCleanedDumps = () => ({
  type: TOGGLE_HIDE_CLEANED_DUMPS,
});

// action type SET_USER_COORDINATES
export const SET_USER_COORDINATES = 'SET_USER_COORDINATES';

// action creator setUserCoordinates
export const setUserCoordinates = (lat, lon) => ({
  type: SET_USER_COORDINATES,
  lat,
  lon,
});

// action type UPDATE_FILTER
export const UPDATE_FILTER = 'UPDATE_FILTER';

// action creator updateFilter
export const updateFilter = (value, name) => ({
  type: UPDATE_FILTER,
  value,
  name,
});
