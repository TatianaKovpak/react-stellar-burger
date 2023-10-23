import { number } from "prop-types";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,  WS_GET_MESSAGE, WS_CONNECTION_SUCCESS, WS_CONNECTION_OPEN, TWsConnectionActions } from "../actions/socketMiddlewareActions"
import { TOrders } from "../types/data";

export type TSocketMiddlewareState = {
    wsConnected: boolean;
    error: undefined | string;
    allOrders: TOrders;
}

const initialState:  TSocketMiddlewareState = {
    wsConnected: false,
    error: undefined,
    allOrders: {
        success : false,
        total : 0,
        totalToday : 0,
        orders : [
            {
            createdAt: '',
            ingredients: [
                /*{
                    _id: '',
                    name: '',
                    type: '',
                    proteins: 0,
                    fat: 0,
                    carbohydrates: 0,
                    calories: 0,
                    price: 0,
                    image: '',
                    image_mobile: '',
                    image_large: '',
                    __v: 0,
                }*/
            ],
            name: '',
            number: 0,
            status: '',
            updatedAt: '',
            _id: '',
        }
        ]
        
    },
}

export const socketMiddlewareReducer = (state = initialState, action: TWsConnectionActions) : TSocketMiddlewareState => {
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