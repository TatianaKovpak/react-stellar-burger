import { loginUser, registerUser, resetPasswordRequest, getUser,  logoutRequest, refreshTokenRequest, refreshUserDataRequest } from "../../utils/api-burger"
import { AppThunk, AppDispatch } from "../types"
import { TUser } from "../types/data"


export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS'
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED'
export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST'

export const REGISTRATION_REQUEST: 'REGISTRATION_REQUEST' = 'REGISTRATION_REQUEST'
export const REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS' = 'REGISTRATION_SUCCESS'
export const REGISTRATION_FAILED: 'REGISTRATION_FAILED' = 'REGISTRATION_FAILED'

export const AUTHORIZATION_SUCCESS: 'AUTHORIZATION_SUCCESS'  = 'AUTHORIZATION_SUCCESS'
export const AUTHORIZATION_REQEST: 'AUTHORIZATION_REQEST' = 'AUTHORIZATION_REQEST'
export const AUTHORIZATION_FAILED: 'AUTHORIZATION_FAILED' = 'AUTHORIZATION_FAILED'

export const FORGOT_PASSWORD: 'FORGOT_PASSWORD' = 'FORGOT_PASSWORD'
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED'
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS'

export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD'
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED'
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS'

export const REFRESH_USERDATA_REQEST: 'REFRESH_TOKEN' = 'REFRESH_TOKEN'
export const REFRESH_USERDATA_FAILED: 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED'
export const REFRESH_USERDATA_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS'

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED'
export const ISAUTHORIZATION_REQEST: 'ISAUTHORIZATION_REQEST' = 'ISAUTHORIZATION_REQEST'

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    user: TUser
}
export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED
}
export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST
}
export interface IRegistrationRequestAction {
    readonly type: typeof REGISTRATION_REQUEST
}
export interface IRegistrationFailedAction {
    readonly type: typeof REGISTRATION_FAILED
}
export interface IRegistrationSuccessAction {
    readonly type: typeof REGISTRATION_SUCCESS
}
export interface IAuthorizationRequestAction {
    readonly type: typeof AUTHORIZATION_REQEST
}
export interface IAuthorizationFailedAction {
    readonly type: typeof AUTHORIZATION_FAILED
}
export interface IAuthorizationSuccessAction {
    readonly type: typeof AUTHORIZATION_SUCCESS;
    user: TUser;
    accessToken: string;
    refreshToken: string
}
export interface IForgotPasswordAction {
    readonly type: typeof FORGOT_PASSWORD;
};
export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
};
export interface IForgotPasswordSuccessAction{
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
};
export interface IResetPasswordAction {
    readonly type: typeof RESET_PASSWORD;
};
export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
};
export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
};
export interface IRefreshUserDataAction {
    readonly type: typeof REFRESH_USERDATA_REQEST;
};
export interface IRefreshUserDataSuccessAction {
    readonly type: typeof REFRESH_USERDATA_SUCCESS;
    user: TUser;
};
export interface IRefreshUserDataFailedAction {
    readonly type: typeof REFRESH_USERDATA_FAILED;
};
export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
};
export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
    token: string | null;
    isAuth: boolean;
};
export interface ILogoutFailedtAction {
    readonly type: typeof LOGOUT_FAILED;
};
export interface IIsAuthorizationRequestAction {
    readonly type: typeof ISAUTHORIZATION_REQEST;
};

export type TUserActions = | IGetUserSuccessAction | IGetUserFailedAction | IGetUserRequestAction | IRegistrationRequestAction | IRegistrationFailedAction |
IRegistrationSuccessAction | IAuthorizationRequestAction | IAuthorizationFailedAction | IAuthorizationSuccessAction | IForgotPasswordAction | IForgotPasswordFailedAction |
IForgotPasswordSuccessAction | IResetPasswordAction | IResetPasswordFailedAction | IResetPasswordSuccessAction | IRefreshUserDataAction | IRefreshUserDataSuccessAction |
IRefreshUserDataFailedAction | ILogoutRequestAction | ILogoutSuccessAction | ILogoutFailedtAction | IIsAuthorizationRequestAction;

export const userRegistration: AppThunk = (value) => (dispatch: AppDispatch) => {

        dispatch({
            type: REGISTRATION_REQUEST
        })
        registerUser(value)
        .then(res => {
            if(res && res.success) {
                dispatch({
                    type: REGISTRATION_SUCCESS,
                    
                })

            } else {
                dispatch({
                    type: REGISTRATION_FAILED
                })
            }
        })
        .catch(err => {
            dispatch({
                type: REGISTRATION_FAILED,
            })
        })
    
}

export const userAuthorization : AppThunk = (value) => (dispatch: AppDispatch) =>{
   
        dispatch({
            type: AUTHORIZATION_REQEST
        })
        loginUser(value)

        .then(res => {
            
            if(res && res.success) {
                localStorage.setItem('accessToken', res.accessToken)
                localStorage.setItem('refreshToken', res.refreshToken)
                dispatch({
                    type: AUTHORIZATION_SUCCESS,
                    user: res.user,
                    isAuth: true,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken
                })
            } else {
                dispatch({
                    type: AUTHORIZATION_FAILED,
                    
                })
            }
        })
        .catch(err => {
            dispatch({
                type: AUTHORIZATION_FAILED,
            })
        })
    
}


export const getUserData : AppThunk = () => (dispatch: AppDispatch) => {
    const accessToken = localStorage.getItem('accessToken')
        dispatch({
            type: GET_USER_REQUEST
        })
        getUser(accessToken)
        .then(res => {
            if(res && res.success) {
                 dispatch({
                     type: GET_USER_SUCCESS,
                     user: res.user,
                     isAuth: true
                 })
            } else {
                dispatch({
                    type: GET_USER_FAILED
                })
            }
        })
        .catch(err => {
            
            if (err === "Ошибка:403" || err ==='Ошибка:401') {
                refreshTokenRequest()
                .then((res) => {
                    localStorage.setItem('refreshToken', res.refreshToken)
                    localStorage.setItem('accessToken', res.accessToken)
                    // dispatch(getUserData())
                    getUserData()
                })
            } else {
                dispatch({
                    type: GET_USER_FAILED,
                })
            }
        })
    
}

export const resetPassword: AppThunk = (value) => (dispatch: AppDispatch) => {
        dispatch({
            type: RESET_PASSWORD
        })
        resetPasswordRequest(value)
        .then(res => {
            if(res && res.success) {
                localStorage.removeItem('forgotPasswordSuccess')
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                })
            } else {
                dispatch({
                    type: RESET_PASSWORD_FAILED
                })
            }
        })
        .catch(err => {
            dispatch({
                type: RESET_PASSWORD_FAILED,
             })
        })
        
    
}

export const logoutAction: AppThunk = () => (dispatch: AppDispatch) => {

        dispatch({
            type: LOGOUT_REQUEST
        })
        logoutRequest()
        .then(res => {
            if(res && res.success) {
                dispatch({
                    type: LOGOUT_SUCCESS,
                    token: null,
                    isAuth: false
                }) 
            } else {
                dispatch({
                    type: LOGOUT_FAILED
                })
            }
        })
        .catch(err => {
            dispatch({
                type: LOGOUT_FAILED,
            })
        })
        localStorage.clear()
}

export const refreshUserData: AppThunk = (form) => (dispatch: AppDispatch) => {
    const accessToken = localStorage.getItem('accessToken')
        dispatch({
            type: REFRESH_USERDATA_REQEST
        })
        refreshUserDataRequest(accessToken, form)
        .then((res) => {
            if(res && res.success) {
                dispatch({
                    type: REFRESH_USERDATA_SUCCESS,
                    user: res.user
                })
            } else {
                dispatch({
                    type: REFRESH_USERDATA_FAILED
                })
            }
        })
        .catch((err) => {
            console.log(err)
            if (err === "Ошибка:403" || err ==='Ошибка:401') {
                refreshTokenRequest()
                .then((res) => {
                    localStorage.setItem('refreshToken', res.refreshToken)
                    localStorage.setItem('accessToken', res.accessToken)
                    // dispatch(refreshUserData(form))
                    refreshUserData(form)
                })
            } else {
                dispatch({
                    type: REFRESH_USERDATA_FAILED
                })
            }
        })
}