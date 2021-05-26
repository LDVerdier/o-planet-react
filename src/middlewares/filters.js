import axiosService from 'src/services/api';

import {
  LOAD_DUMPS_WITH_FILTERS_API,
} from 'src/actions/filters';

import {
  saveDumps,
} from 'src/actions/dumps';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case LOAD_DUMPS_WITH_FILTERS_API: {
      let url = '/v1/public/dumps';

      // check all filters and add necessary URL parameters
      const filters = [];

      const { emergency } = store.getState().filters;

      if (emergency) {
        filters.push(`emergency=${emergency}`);
      }

      const { wastes } = store.getState().filters;
      // console.log(wastes);

      if (wastes.length > 0) {
        const wastesString = wastes.join();
        // console.log(wastesString);
        filters.push(`wastes=${wastesString}`);
      }

      // console.log(filters);
      const { userPositionChoice } = store.getState().filters;

      // if userPositionChoice equals 0, do not restrict the search
      if (userPositionChoice) {
        const { lat, lon } = store.getState().filters.userCoordinates;
        // distance in kilometers
        const N = 30;
        // approximately gives coordinates for a square box around the specified coordinates
        const minLat = lat - (0.009 * N);
        const maxLat = lat + (0.009 * N);
        const minLon = lon - (0.009 * N);
        const maxLon = lon + (0.009 * N);

        filters.push(`latitudeCoordinate=${minLat},${maxLat}&longitudeCoordinate=${minLon},${maxLon}`);
      }

      // expands the url with ? followed by all filters separated with &
      if (filters.length > 0) {
        url += `?${filters.join('&')}`;
      }

      const thenCallback = (response) => {
        store.dispatch(saveDumps(response.data));
        console.log(response.data);
      };
      const errorCallback = (error) => console.error('Erreur ! ', error.data);

      axiosService.get(url, thenCallback, errorCallback);
      break;
    }

    default:
      next(action);
  }
};
