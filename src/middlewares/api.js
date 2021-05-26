/* eslint-disable no-unused-vars */

import React from 'react';
import axiosService from 'src/services/api';
import toastService from 'src/services/toast';

import {
  LOAD_DUMPS_API,
  UPDATE_DUMP_API,
  POST_DUMP_API,
  saveDumps,
  LOAD_DUMP_BY_ID_API,
  saveDump,
  DELETE_DUMP_API,
  VALIDATE_DUMP_API,
  loadDumpsApi,
  SEND_REMOVAL_TO_API,
  loadDumpByIdApi,
  DELETE_REMOVAL,
  LOAD_STATS_API,
  saveStats,
  SUBSCRIBE_TO_REMOVAL,
  VALIDATE_REMOVAL,
  LOAD_EMERGENCY_AND_WASTE,
  saveEmergencyAndWaste,
} from 'src/actions/dumps';

import {
  RESET_FILTERS,
} from 'src/actions/filters';

// eslint-disable-next-line no-unused-vars
export default (store) => (next) => (action) => {
  switch (action.type) {
    case LOAD_EMERGENCY_AND_WASTE: {
      const url = '/v1/public/EmergencyAndWaste';

      const thenCallback = (response) => {
        store.dispatch(saveEmergencyAndWaste(response.data));
      };
      const errorCallback = (error) => toastService.error('Impossible de charger les données initiales !');

      axiosService.get(url, thenCallback, errorCallback);
      break;
    }
    case LOAD_DUMPS_API: {
      const url = '/v1/public/dumps';

      const thenCallback = (response) => {
        store.dispatch(saveDumps(response.data));
      };
      const errorCallback = (error) => toastService.error('Impossible de charger la liste des dumps !');

      axiosService.get(url, thenCallback, errorCallback);
      break;
    }

    case LOAD_DUMP_BY_ID_API: {
      const url = `/v1/public/dumps/${action.dumpId}`;

      const thenCallback = (response) => {
        store.dispatch(saveDump(response.data));
      };

      const errorCallback = (error) => toastService.error('Impossible de charger ce dump !');

      axiosService.get(url, thenCallback, errorCallback);
      break;
    }

    case UPDATE_DUMP_API: {
      const { dumpId } = action;
      const url = `/v1/dumps/${dumpId}`;
      const errors = [];

      // get the form data from the state
      const {
        title,
        latitudeCoordinate,
        longitudeCoordinate,
        description,
        emergencyId,
        wastesIds,
        isClosed,
        user,
      } = store.getState().dumps.dumpForm;

      if (!title) {
        errors.push('Veuillez saisir un titre !');
      }
      if (emergencyId < 1 || emergencyId > 3) {
        errors.push('Veuillez saisir un niveau d\'urgence valide !');
      }
      if (wastesIds.length === 0) {
        errors.push('Veuillez saisir au moins un type de déchet !');
      }
      const payload = JSON.stringify({
        title: title,
        latitudeCoordinate: latitudeCoordinate,
        longitudeCoordinate: longitudeCoordinate,
        description: description,
        emergency: emergencyId,
        wastes: wastesIds,
        isClosed: 0,
        user: user,
      });

      const thenCallback = (response) => {
        toastService.info('Mise à jour réussie !');
        loadDumpByIdApi(store.getState().dumps.currentDump.id);
        next(action);
      };

      const errorCallback = (error) => toastService.error('Erreur lors de la mise à jour du dump !');

      if (errors.length === 0) {
        axiosService.patch(url, payload, thenCallback, errorCallback);
      }
      else {
        // allows to have multiline in the toast
        const errorsAsJsx = errors.map((errorEl) => (
          <div key={errorEl}>
            {errorEl}
          </div>
        ));
        toastService.error(<div>{errorsAsJsx}</div>);
      }

      break;
    }

    case POST_DUMP_API: {
      const url = '/v1/dumps';

      const errors = [];

      // get the form data from the state
      const {
        title,
        latitudeCoordinate,
        longitudeCoordinate,
        description,
        emergencyId,
        wastesIds,
        isClosed,
        // removals,
      } = store.getState().dumps.dumpForm;

      if (!title) {
        errors.push('Veuillez saisir un titre !');
      }
      if (emergencyId < 1 || emergencyId > 3) {
        errors.push('Veuillez saisir un niveau d\'urgence valide !');
      }
      if (wastesIds.length === 0) {
        errors.push('Veuillez saisir au moins un type de déchet !');
      }
      // get the attached file
      const { file } = action;

      // store the data + the file in a FormData object
      const formData = new FormData();

      const newDump = JSON.stringify({
        title: title,
        latitudeCoordinate: latitudeCoordinate,
        longitudeCoordinate: longitudeCoordinate,
        description: description,
        emergency: emergencyId,
        wastes: wastesIds,
        isClosed: 0,
        user: store.getState().users.userData.id,
      });

      formData.append('dump', newDump);
      if (file) {
        formData.append('File', file);
      }
      const payload = formData;

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const thenCallback = (response) => {
        toastService.info('Publication réussie !');
        next(action);
      };

      const errorCallback = (error) => toastService('Erreur lors de la publication du dump !');
      if (errors.length === 0) {
        axiosService.post(url, payload, thenCallback, errorCallback, config);
      }
      else {
        // allows to have multiline in the toast
        const errorsAsJsx = errors.map((errorEl) => (
          <div key={errorEl}>
            {errorEl}
          </div>
        ));
        toastService.error(<div>{errorsAsJsx}</div>);
      }
      break;
    }

    case DELETE_DUMP_API: {
      const { id } = store.getState().dumps.currentDump;
      const url = `/v1/dumps/${id}`;

      const thenCallback = (response) => {
        toastService.info('Suppression du dump réussie !');
        store.dispatch(loadDumpsApi());
        next(action);
      };

      const errorCallback = (error) => toastService.error('Erreur lors de suppression du dump !');

      axiosService.del(url, thenCallback, errorCallback);
      break;
    }

    case VALIDATE_DUMP_API: {
      const { id } = store.getState().dumps.currentDump;
      const url = `/v1/dumps/close/${id}`;

      const payload = {};

      const thenCallback = (response) => {
        toastService.info('Marqué comme nettoyé !');
        store.dispatch(loadDumpByIdApi(id));
        // next(action);
      };

      const errorCallback = (error) => toastService.error('Erreur lors de la validation du dump !');

      axiosService.patch(url, payload, thenCallback, errorCallback);
      break;
    }
    case SEND_REMOVAL_TO_API: {
      // prepare parameters for API call
      const url = '/v1/removals/add';

      const { date } = action;

      const payload = {
        date,
        dump: store.getState().dumps.currentDump.id,
        creator: store.getState().users.userData.id,
      };
      const thenCallback = (response) => {
        store.dispatch(loadDumpByIdApi(store.getState().dumps.currentDump.id));
      };

      const errorCallback = (error) => {
        toastService.error('Erreur lors de la création du ramassage !');
      };

      axiosService.post(url, payload, thenCallback, errorCallback);

      break;
    }
    case DELETE_REMOVAL: {
      // prepare parameters for API call
      const url = `/v1/removals/${action.value}`;

      const thenCallback = (response) => {
        // reload the page
        store.dispatch(loadDumpByIdApi(store.getState().dumps.currentDump.id));
      };

      const errorCallback = (error) => {
        toastService.error('Erreur lors de la suppression du ramasssage !');
      };

      axiosService.del(url, thenCallback, errorCallback);

      break;
    }
    case LOAD_STATS_API: {
      // prepare parameters for API call
      const url = '/v1/public/statistics';

      const thenCallback = (response) => {
        const stats = {
          declaredDumps: response.data['dumps déclarés'],
          clearedDumps: response.data['dumps nettoyés'],
          dumpsToClean: response.data['dumps restant à nettoyer'],
          pendingRemovals: response.data['campagnes de ramassage ouvertes'],
        };
        store.dispatch(saveStats(stats));
      };

      const errorCallback = (error) => {
        toastService.error('Erreur lors du chargement des statistiques !');
      };

      axiosService.get(url, thenCallback, errorCallback);

      break;
    }
    case SUBSCRIBE_TO_REMOVAL: {
      // prepare parameters for API call
      const subscribeOrNot = action.value ? 'unsubscribe' : 'subscribe';
      const url = `/v1/removals/${subscribeOrNot}/${action.removalId}`;

      const payload = {};

      const thenCallback = (response) => {
        store.dispatch(loadDumpByIdApi(store.getState().dumps.currentDump.id));
      };

      const errorCallback = (error) => {
      };

      axiosService.post(url, payload, thenCallback, errorCallback);

      break;
    }
    case VALIDATE_REMOVAL: {
      // prepare parameters for API call
      const url = `/v1/removals/close/${action.removalId}`;

      const payload = {};

      const thenCallback = (response) => {
        store.dispatch(loadDumpByIdApi(store.getState().dumps.currentDump.id));
        toastService.info('Ramassage marqué comme effectué !');
      };

      const errorCallback = (error) => {
        toastService.error('Erreur lors de la validation du ramassage !');
      };

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      axiosService.patch(url, payload, thenCallback, errorCallback, config);

      break;
    }
    case RESET_FILTERS: {
      store.dispatch(loadDumpsApi());
      next(action);
      break;
    }
    default:
      next(action);
  }
};
