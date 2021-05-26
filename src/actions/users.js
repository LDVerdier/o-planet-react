// action type LOGOUT
export const LOGOUT = 'LOGOUT';

// action creator logout
export const logout = () => ({
  type: LOGOUT,
});

// action type RESET_LOGIN_FORMS
export const RESET_LOGIN_FORMS = 'RESET_LOGIN_FORMS';

// action creator resetLoginForms
export const resetLoginForms = () => ({
  type: RESET_LOGIN_FORMS,
});

// action type LOGIN
export const LOGIN = 'LOGIN';

// action creator login
export const login = (origin = 'signin') => ({
  type: LOGIN,
  origin,
});

// action type SAVE_USER
export const SAVE_USER = 'SAVE_USER';

// action creator saveUser
export const saveUser = (userData) => ({
  type: SAVE_USER,
  userData,
});

// action type LOAD_USER_DATA
export const LOAD_USER_DATA = 'LOAD_USER_DATA';

// action creator loadUserData
export const loadUserData = () => ({
  type: LOAD_USER_DATA,
});

// action type STOP_LOADING
export const STOP_LOADING = 'STOP_LOADING';

// action creator stopLoading
export const stopLoading = () => ({
  type: STOP_LOADING,
});

// action type UPDATE_SIGNIN_INPUT
export const UPDATE_SIGNIN_INPUT = 'UPDATE_SIGNIN_INPUT';

// action creator updateSigninInput
export const updateSigninInput = (inputName, inputValue) => ({
  type: UPDATE_SIGNIN_INPUT,
  name: inputName,
  value: inputValue,
});

// action type UPDATE_SIGNUP_INPUT
export const UPDATE_SIGNUP_INPUT = 'UPDATE_SIGNUP_INPUT';

// action creator updateSignupInput
export const updateSignupInput = (inputName, inputValue) => ({
  type: UPDATE_SIGNUP_INPUT,
  name: inputName,
  value: inputValue,
});

// action type SIGNUP
export const SIGNUP = 'SIGNUP';

// action creator signup
export const signup = () => ({
  type: SIGNUP,
});

// action type UPDATE_ACCOUNT
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';

// action creator updateAccount
export const updateAccount = () => ({
  type: UPDATE_ACCOUNT,
});

// action type DELETE_ACCOUNT
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

// action creator deleteAccount
export const deleteAccount = () => ({
  type: DELETE_ACCOUNT,
});

// action type EDIT_USER_UPDATE_FIELD
export const EDIT_USER_UPDATE_FIELD = 'EDIT_USER_UPDATE_FIELD';

// action creator editUserUpdateField
export const editUserUpdateField = (inputName, inputValue) => ({
  type: EDIT_USER_UPDATE_FIELD,
  name: inputName,
  value: inputValue,
});

// action type SAVE_JWT
export const SAVE_JWT = 'SAVE_JWT';

// action creator saveJWT
export const saveJWT = (token) => ({
  type: SAVE_JWT,
  token,
});

// action type SET_SHOW_USER_DATA
export const SET_SHOW_USER_DATA = 'SET_SHOW_USER_DATA';

// action creator setShowUserData
export const setShowUserData = (boolean, name) => ({
  type: SET_SHOW_USER_DATA,
  value: boolean,
  name,
});

// action type RESET_UPDATE_USER_FORM
export const RESET_UPDATE_USER_FORM = 'RESET_UPDATE_USER_FORM';

// action creator resetUpdateUserForm
export const resetUpdateUserForm = () => ({
  type: RESET_UPDATE_USER_FORM,
});
