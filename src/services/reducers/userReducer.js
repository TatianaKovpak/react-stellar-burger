import { GET_USER_REQUEST, GET_USER_FAILED, GET_USER_SUCCESS, REGISTRATION_SUCCESS, REGISTRATION_REQUEST, REGISTRATION_FAILED, AUTHORIZATION_REQEST,
    AUTHORIZATION_FAILED, AUTHORIZATION_SUCCESS, FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED, REFRESH_USERDATA_REQEST,
    REFRESH_USERDATA_FAILED, REFRESH_USERDATA_SUCCESS, RESET_PASSWORD, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS,
    LOGOUT_SUCCESS, LOGOUT_FAILED, LOGOUT_REQUEST } from "../actions/userActions";

const initialState = {
    user: {},
    userRequest: false,
    userFailed: false,
    isAuth: false,
    registrationRequest: false,
    registrationFailed: false,
    accessToken: null,
    refreshToken: null,
    authRequest: false,
    authFailed: false,
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
    refreshUserDataRequest: false,
    refreshUserDataFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    error: null,
};

export const userReducer = (state = initialState, action) => {
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
      case FORGOT_PASSWORD: {
        return {
          ...state,
          forgotPasswordRequest: true,
          forgotPasswordFailed: false,
        };
      }
      case FORGOT_PASSWORD_SUCCESS: {
        return {
          ...state,
          forgotPasswordRequest: false,
        };
      }
      case FORGOT_PASSWORD_FAILED: {
        return {
          ...state,
          forgotPasswordRequest: false,
          forgotPasswordFailed: true,
        };
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

