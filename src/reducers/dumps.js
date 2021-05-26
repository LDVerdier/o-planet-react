// import data from 'src/data';
import {
  UPDATE_STANDARD_INPUT,
  TOGGLE_WASTE,
  EDIT_DUMP,
  RESET_DUMP_FORM,
  SAVE_DUMPS,
  SAVE_DUMP,
  POST_DUMP_API,
  UPDATE_DUMP_API,
  DELETE_DUMP_API,
  TOGGLE_EMERGENCY,
  SAVE_STATS,
  SAVE_EMERGENCY_AND_WASTE,
} from 'src/actions/dumps';
import { findDumpById } from 'src/selectors/dumps';

const dumpElements = require('../data/dumps.json');

const initialDumpForm = {
  title: '',
  latitudeCoordinate: 46.7111,
  longitudeCoordinate: 1.7191,
  description: '',
  emergencyId: 1,
  wastesIds: [],
  picture1: '',
  //! LET ISCLOSED VALUE AT 0, DOT NOT REPLACE WITH FALSE! CAUSES DB ERROR
  isClosed: 0,
  removals: [],
  user: 1,
};

const initialCurrentDump = {
  id: 1,
  title: 'Décharge sauvage',
  latitudeCoordinate: 46.7111,
  longitudeCoordinate: 1.7191,
  description: 'Dépôt d\'ordures près de...',
  picture1: '',
  emergency: {
    id: 1,
    name: 'Elevée',
  },
  wastesIds: [],
  user: {
    id: 0,
    userAlias: 'anonymous',
  },
  dumpWasDeleted: false,
  removals: [],
  isClosed: false,
  createdAt: '',
};

const initialState = {
  list: dumpElements,
  wastesList: [
    {
      id: 1,
      name: 'Matériaux de chantier',
    },
    {
      id: 2,
      name: 'Produits chimiques',
    },
    {
      id: 3,
      name: 'Epave de véhicule',
    },
    {
      id: 4,
      name: 'Détritus',
    },
    {
      id: 5,
      name: 'Electroménager / meubles',
    },
    {
      id: 6,
      name: 'Autres',
    },
  ],
  emergenciesList: [
    {
      id: 1,
      name: 'Elevée',
      example: 'Risque d\'empoisonnement des sols',
    },
    {
      id: 2,
      name: 'Moyenne',
      example: 'Danger pour la faune et les promeneurs',
    },
    {
      id: 3,
      name: 'Faible',
      example: 'Nuisance esthétique',
    },
  ],
  stats: {
    declaredDumps: {
      name: 'décharges signalées',
      quantity: 0,
    },
    clearedDumps: {
      name: 'décharges nettoyées',
      quantity: 0,
    },
    dumpsToClean: {
      name: 'décharges sauvages restant à nettoyer',
      quantity: 0,
    },
    pendingRemovals: {
      name: 'ramassages en cours',
      quantity: 0,
    },
  },
  dumpForm: {
    ...initialDumpForm,
  },
  currentDump: {
    ...initialCurrentDump,
  },
  formSubmitted: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_EMERGENCY_AND_WASTE:
      return {
        ...state,
        wastesList: action.value.wastes,
        emergenciesList: action.value.emergencies,
      };
    case UPDATE_STANDARD_INPUT:
      return {
        ...state,
        dumpForm: {
          ...state.dumpForm,
          [action.name]: action.value,
        },
      };
    case EDIT_DUMP: {
      const dumpToEdit = findDumpById(state.list, action.value);
      return {
        ...state,
        dumpForm: {
          title: dumpToEdit.title,
          latitudeCoordinate: dumpToEdit.latitudeCoordinate,
          longitudeCoordinate: dumpToEdit.longitudeCoordinate,
          description: dumpToEdit.description,
          emergencyId: dumpToEdit.emergency.id,
          wastesIds: dumpToEdit.wastes.map((wasteElement) => wasteElement.id),

        },
      };
    }
    case TOGGLE_WASTE: {
      let newWastesIds = null;
      if (state.dumpForm.wastesIds.includes(action.value)) {
        newWastesIds = state.dumpForm.wastesIds.filter((wasteId) => wasteId !== action.value);
      }
      else {
        newWastesIds = [...state.dumpForm.wastesIds, action.value];
      }

      return {
        ...state,
        dumpForm: {
          ...state.dumpForm,
          wastesIds: newWastesIds,
        },
      };
    }
    case TOGGLE_EMERGENCY:
      return {
        ...state,
        dumpForm: {
          ...state.dumpForm,
          emergencyId: action.value,
        },
      };
    case RESET_DUMP_FORM:
      return {
        ...state,
        formSubmitted: false,
        dumpForm: {
          ...initialDumpForm,
        },
        currentDump: {
          ...initialCurrentDump,
        },
      };
    case SAVE_DUMPS:
      return {
        ...state,
        list: action.dumpsList,
      };

    case SAVE_DUMP:
      return {
        ...state,
        currentDump: {
          id: action.dumpElement.id,
          title: action.dumpElement.title,
          latitudeCoordinate: action.dumpElement.latitudeCoordinate,
          longitudeCoordinate: action.dumpElement.longitudeCoordinate,
          description: action.dumpElement.description,
          emergency: action.dumpElement.emergency,
          wastesIds: action.dumpElement.wastes.map((wasteElement) => wasteElement.id),
          user: action.dumpElement.user,
          picture1: action.dumpElement.picture1,
          dumpWasDeleted: false,
          removals: action.dumpElement.removals,
          isClosed: action.dumpElement.isClosed,
          createdAt: action.dumpElement.createdAt,
        },
      };

    case POST_DUMP_API:
      return {
        ...state,
        formSubmitted: true,
      };

    case UPDATE_DUMP_API:
      return {
        ...state,
        formSubmitted: true,
      };

    case DELETE_DUMP_API:
      return {
        ...state,
        currentDump: {
          ...initialCurrentDump,
        },
        formSubmitted: true,
      };
    case SAVE_STATS:
      return {
        ...state,
        stats: {
          declaredDumps: {
            ...state.stats.declaredDumps,
            quantity: action.value.declaredDumps,
          },
          clearedDumps: {
            ...state.stats.clearedDumps,
            quantity: action.value.clearedDumps,
          },
          dumpsToClean: {
            ...state.stats.dumpsToClean,
            quantity: action.value.dumpsToClean,
          },
          pendingRemovals: {
            ...state.stats.pendingRemovals,
            quantity: action.value.pendingRemovals,
          },
        },
      };

    default:
      return state;
  }
};

export default reducer;
