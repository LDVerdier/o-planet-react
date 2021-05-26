import { formatDate } from 'src/utils/functions';

import {
  LOGOUT,
  RESET_LOGIN_FORMS,
  SAVE_USER,
  LOGIN,
  STOP_LOADING,
  UPDATE_SIGNIN_INPUT,
  UPDATE_SIGNUP_INPUT,
  SIGNUP,
  EDIT_USER_UPDATE_FIELD,
  SAVE_JWT,
  SET_SHOW_USER_DATA,
  RESET_UPDATE_USER_FORM,
} from 'src/actions/users';

import { initialSignin, initialSignup, initialUserData } from 'src/data/initials';

const initialState = {
  isLogged: false,
  signin: {
    ...initialSignin,
  },
  signup: {
    ...initialSignup,
  },
  userData: {
    ...initialUserData,
  },
  userUpdateForm: {
    email: '',
    userAlias: '',
    firstname: '',
    lastname: '',
    password: '',
    repeatPassword: '',
  },
  jwtFromState: '',
  showUserData: false,
  showUserForm: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        isLogged: false,
        userData: {
          ...initialUserData,
        },
        jwtFromState: '',
      };
    case RESET_LOGIN_FORMS:
      return {
        ...state,
        signin: {
          ...initialSignin,
        },
        signup: {
          ...initialSignup,
        },
      };
    case UPDATE_SIGNIN_INPUT:
      return {
        ...state,
        signin: {
          ...state.signin,
          [action.name]: action.value,
        },
      };
    case UPDATE_SIGNUP_INPUT:
      return {
        ...state,
        signup: {
          ...state.signup,
          [action.name]: action.value,
        },
      };
    case EDIT_USER_UPDATE_FIELD:
      return {
        ...state,
        userUpdateForm: {
          ...state.userUpdateForm,
          [action.name]: action.value,
        },
      };
    case LOGIN:
      return {
        ...state,
        signin: {
          ...state.signin,
          // allows to have only one loading button between signin and signup
          isLoading: !state.signup.isLoading,
        },
      };
    case SIGNUP:
      return {
        ...state,
        signup: {
          ...state.signup,
          isLoading: true,
        },
      };
    case SAVE_USER:
      return {
        ...state,
        isLogged: true,
        signin: {
          ...initialSignin,
        },
        signup: {
          ...initialSignup,
        },
        userData: {
          ...action.userData,
          createdAt: formatDate(action.userData.createdAt),
          updatedAt: formatDate(action.userData.updatedAt),
        },
        userUpdateForm: {
          email: action.userData.email,
          userAlias: action.userData.userAlias,
          firstname: action.userData.firstname,
          lastname: action.userData.lastname,
          password: '',
          repeatPassword: '',
        },
      };
    case SAVE_JWT:
      return {
        ...state,
        jwtFromState: action.token,
      };
    case STOP_LOADING:
      return {
        ...state,
        signin: {
          ...state.signin,
          isLoading: false,
        },
        signup: {
          ...state.signup,
          isLoading: false,
        },
      };
    case SET_SHOW_USER_DATA:
      return {
        ...state,
        [action.name]: action.value,
      };
    case RESET_UPDATE_USER_FORM:
      return {
        ...state,
        userUpdateForm: {
          email: state.userData.email,
          userAlias: state.userData.userAlias,
          firstname: state.userData.firstname,
          lastname: state.userData.lastname,
          password: '',
          repeatPassword: '',
        },
      };
    default:
      // console.log('default ! received:', action);
      return state;
  }
};

export default reducer;
