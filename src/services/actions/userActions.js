import { loginUser, registerUser, resetPasswordRequest, getUser,  logoutRequest, refreshTokenRequest, refreshUserDataRequest } from "../../utils/api-burger"


export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILED = 'GET_USER_FAILED'
export const GET_USER_REQUEST = 'GET_USER_REQUEST'

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST'
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS'
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED'

export const AUTHORIZATION_SUCCESS = 'AUTHORIZATION_SUCCESS'
export const AUTHORIZATION_REQEST = 'AUTHORIZATION_REQEST'
export const AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED'

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'

export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'

export const REFRESH_USERDATA_REQEST = 'REFRESH_TOKEN'
export const REFRESH_USERDATA_FAILED = 'REFRESH_TOKEN_FAILED'
export const REFRESH_USERDATA_SUCCESS = 'REFRESH_TOKEN_SUCCESS'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'
export const ISAUTHORIZATION_REQEST = 'ISAUTHORIZATION_REQEST'



export const userRegistration = (value) => {
    return function(dispatch) {
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
}

export const userAuthorization = (value) => {
    return function(dispatch) {
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
}


export const getUserData = () => {
    const accessToken = localStorage.getItem('accessToken')
    return function(dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        })
        getUser(accessToken)
        .then(res => {
            if(res && res.success) {
                 dispatch({
                     type: GET_USER_SUCCESS,
                     user: res.user
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
                    dispatch(getUserData())
                })
            } else {
                dispatch({
                    type: GET_USER_FAILED,
                })
            }
        })
    }
}

export const resetPassword = (value) => {
    return function(dispatch) {
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
}

export const logoutAction = () => {
    return function(dispatch) {
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
}

export const refreshUserData = (form) => {
    const accessToken = localStorage.getItem('accessToken')
    return function(dispatch) {
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
                    dispatch(refreshUserData(form))
                })
            } else {
                dispatch({
                    type: REFRESH_USERDATA_FAILED
                })
            
            }
        })
    }
}