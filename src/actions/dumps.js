// action type UPDATE_STANDARD_INPUT
export const UPDATE_STANDARD_INPUT = 'UPDATE_STANDARD_INPUT ';

// action creator updateStandardInput
export const updateStandardInput = (inputName, inputValue) => ({
  type: UPDATE_STANDARD_INPUT,
  name: inputName,
  value: inputValue,
});

// action type TOGGLE_WASTE
export const TOGGLE_WASTE = 'TOGGLE_WASTE';

// action creator toggleWaste
export const toggleWaste = (idValue) => ({
  type: TOGGLE_WASTE,
  value: idValue,
});

// action type TOGGLE_EMERGENCY
export const TOGGLE_EMERGENCY = 'TOGGLE_EMERGENCY';

// action creator toggleEmergency
export const toggleEmergency = (idValue) => ({
  type: TOGGLE_EMERGENCY,
  value: idValue,
});

// action type EDIT_DUMP
export const EDIT_DUMP = 'EDIT_DUMP';

// action creator editDump
export const editDump = (dumpId) => ({
  type: EDIT_DUMP,
  value: dumpId,
});

// action type RESET_DUMP_FORM
export const RESET_DUMP_FORM = 'RESET_DUMP_FORM';

// action creator resetDumpForm
export const resetDumpForm = () => ({
  type: RESET_DUMP_FORM,
});

// action type SAVE_DUMP
export const SAVE_DUMP = 'SAVE_DUMP';

// action creator saveDump
export const saveDump = (dumpElement) => ({
  type: SAVE_DUMP,
  dumpElement,
});

// action type UPDATE_DUMP_API
export const UPDATE_DUMP_API = 'UPDATE_DUMP_API';

// action creator updateDumpApi
export const updateDumpApi = (dumpId, file) => ({
  type: UPDATE_DUMP_API,
  dumpId,
  file,
});

// action type POST_DUMP_API
export const POST_DUMP_API = 'POST_DUMP_API';

// action creator postDumpApi
export const postDumpApi = (file) => ({
  type: POST_DUMP_API,
  file,
});

// action type LOAD_DUMPS_API
export const LOAD_DUMPS_API = 'LOAD_DUMPS_API';

// action creator loadDumpsApi
export const loadDumpsApi = () => ({
  type: LOAD_DUMPS_API,
});

// action type SAVE_DUMPS
export const SAVE_DUMPS = 'SAVE_DUMPS';

// action creator saveDumps
export const saveDumps = (dumpsList) => ({
  type: SAVE_DUMPS,
  dumpsList,
});

// action type LOAD_DUMP_BY_ID_API
export const LOAD_DUMP_BY_ID_API = 'LOAD_DUMP_BY_ID_API';

// action creator loadDumpByIdApi
export const loadDumpByIdApi = (dumpId) => ({
  type: LOAD_DUMP_BY_ID_API,
  dumpId,
});

// action type DELETE_DUMP_API
export const DELETE_DUMP_API = 'DELETE_DUMP_API';

// action creator deleteDumpApi
export const deleteDumpApi = () => ({
  type: DELETE_DUMP_API,
});

// action type SEND_REMOVAL_TO_API
export const SEND_REMOVAL_TO_API = 'SEND_REMOVAL_TO_API';

// action creator sendRemovalToApi
export const sendRemovalToApi = (timestamp) => ({
  type: SEND_REMOVAL_TO_API,
  date: timestamp,
});

// action type DELETE_REMOVAL
export const DELETE_REMOVAL = 'DELETE_REMOVAL';

// action creator deleteRemoval
export const deleteRemoval = (id) => ({
  type: DELETE_REMOVAL,
  value: id,
});

// action type LOAD_STATS_API
export const LOAD_STATS_API = 'LOAD_STATS_API';

// action creator loadStatsApi
export const loadStatsApi = () => ({
  type: LOAD_STATS_API,
});

// action type SAVE_STATS
export const SAVE_STATS = 'SAVE_STATS';

// action creator saveStats
export const saveStats = (stats) => ({
  type: SAVE_STATS,
  value: stats,
});

// action type SUBSCRIBE_TO_REMOVAL
export const SUBSCRIBE_TO_REMOVAL = 'SUBSCRIBE_TO_REMOVAL';

// action creator subscribeToRemoval
export const subscribeToRemoval = (isSubscriber, removalId) => ({
  type: SUBSCRIBE_TO_REMOVAL,
  value: isSubscriber,
  removalId,
});

// action type VALIDATE_REMOVAL
export const VALIDATE_REMOVAL = 'VALIDATE_REMOVAL';

// action creator validateRemoval
export const validateRemoval = (id) => ({
  type: VALIDATE_REMOVAL,
  removalId: id,
});

// action type VALIDATE_DUMP_API
export const VALIDATE_DUMP_API = 'VALIDATE_DUMP_API';

// action creator validateDumpApi
export const validateDumpApi = () => ({
  type: VALIDATE_DUMP_API,
});

// action type LOAD_EMERGENCY_AND_WASTE
export const LOAD_EMERGENCY_AND_WASTE = 'LOAD_EMERGENCY_AND_WASTE';

// action creator loadEmergencyAndWaste
export const loadEmergencyAndWaste = () => ({
  type: LOAD_EMERGENCY_AND_WASTE,
});

// action type SAVE_EMERGENCY_AND_WASTE
export const SAVE_EMERGENCY_AND_WASTE = 'SAVE_EMERGENCY_AND_WASTE';

// action creator saveEmergencyAndWaste
export const saveEmergencyAndWaste = (value) => ({
  type: SAVE_EMERGENCY_AND_WASTE,
  value,
});
