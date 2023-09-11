import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,  WS_GET_MESSAGE, WS_CONNECTION_SUCCESS, WS_CONNECTION_OPEN } from "../actions/socketMiddlewareActions"



const initialState = {
    wsConnected: false,
    error: undefined,
    allOrders: [],
}

export const socketMiddlewareReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true
            }
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            }
        }
        case WS_CONNECTION_OPEN: {
            return {
                ...state,
                wsConnected: true
            }
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnected: false
            }
        }
        case WS_GET_MESSAGE: {
            return {
                ...state,
                error: undefined,
                allOrders: action.payload
            }
        }
 
        default: {
            return state
        }   

    }

}