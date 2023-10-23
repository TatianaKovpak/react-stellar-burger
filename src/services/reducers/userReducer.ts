import { GET_USER_REQUEST, GET_USER_FAILED, GET_USER_SUCCESS, REGISTRATION_SUCCESS, REGISTRATION_REQUEST, REGISTRATION_FAILED, AUTHORIZATION_REQEST,
    AUTHORIZATION_FAILED, AUTHORIZATION_SUCCESS, REFRESH_USERDATA_REQEST,
    REFRESH_USERDATA_FAILED, REFRESH_USERDATA_SUCCESS, RESET_PASSWORD, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS,
    LOGOUT_SUCCESS, LOGOUT_FAILED, LOGOUT_REQUEST, TUserActions } from "../actions/userActions";
import { TUser } from "../types/data";

export type TUserState = {
  user: TUser ;
  userRequest: boolean,
  userFailed: boolean,
  isAuth: boolean,
  registrationRequest: boolean,
  registrationFailed: boolean,
  accessToken: null | string,
  refreshToken: null | string,
  authRequest: boolean,
  authFailed: boolean,
  resetPasswordRequest: boolean,
  resetPasswordFailed: boolean,
  refreshUserDataRequest: boolean,
  refreshUserDataFailed: boolean,
  logoutRequest: boolean,
  logoutFailed: boolean,
  error: null | string,


}
const initialState: TUserState = {
    user: {
      name: '',
      email: ''
    },
    userRequest: false,
    userFailed: false,
    isAuth: false,
    registrationRequest: false,
    registrationFailed: false,
    accessToken: null,
    refreshToken: null,
    authRequest: false,
    authFailed: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
    refreshUserDataRequest: false,
    refreshUserDataFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    error: null,
};

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
  switch (action.type) {
      case GET_USER_REQUEST: {
        return {
          ...state,
          userRequest: true,
        };
      }
        case GET_USER_SUCCESS: {
        return {
          ...state,
          userRequest: true,
          userFailed: false,
          user: action.user,
          isAuth: true
        };
      }
      case GET_USER_FAILED: {
        return {
          ...state,
          userRequest: false,
          userFailed: true,
          
        };
      }
      case REGISTRATION_REQUEST: {
        return {
          ...state,
          registrationRequest: true,
          registrationFailed: false,
        };
      }
      case REGISTRATION_SUCCESS: {
        return {
          ...state,
          registrationRequest: false,
         
        };
      }
      case REGISTRATION_FAILED: {
        return {
          ...state,
          registrationRequest: false,
          registrationFailed: true,
        };
      }
      case AUTHORIZATION_SUCCESS: {
        return {
            ...state,
            authRequest: true,
            authFailed: false,
            isAuth: true,
            user: action.user,
            accessToken: action.accessToken,
            refreshToken: action.refreshToken
        }
      }
      case AUTHORIZATION_REQEST: {
        return {
            ...state,
            authRequest: true,
            authFailed: false
        }
      }
      case AUTHORIZATION_FAILED: {
        return {
            ...state,
            authRequest: false,
            authFailed: true
        }
      }

      case RESET_PASSWORD: {
        return {
          ...state,
          resetPasswordRequest: true,
          resetPasswordFailed: false,
        };
      }
      case RESET_PASSWORD_SUCCESS: {
        return {
          ...state,
          resetPasswordRequest: false,
        };
      }
      case RESET_PASSWORD_FAILED: {
        return {
          ...state,
          resetPasswordRequest: false,
          resetPasswordFailed: true,
        };
      }
      case REFRESH_USERDATA_REQEST: {
        return {
          ...state,
          refreshUserDataRequest: true,
          refreshUserDataFailed: false,
        };
      }
      case REFRESH_USERDATA_SUCCESS: {
        return {
          ...state,
          refreshUserDataRequest: false,
          user: action.user,
        };
      }
      case REFRESH_USERDATA_FAILED: {
        return {
          ...state,
          refreshUserDataRequest: false,
          refreshUserDataFailed: true,
        };
      }
      case LOGOUT_REQUEST: {
        return {
          ...state,
          logoutRequest: true,
          logoutFailed: false,
          refreshToken: null

        }
      }
      case LOGOUT_SUCCESS: {
        return {
          ...state,
          logoutRequest: true,
          logoutFailed: false,
          accessToken: action.token,
          isAuth: action.isAuth
        }
      }

      case LOGOUT_FAILED: {
        return {
          ...state,
          logoutRequest: false,
          logoutFailed: true
        }

      }
    
      default: {
        return state

    } 
  }
};

