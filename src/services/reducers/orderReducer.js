import { ORDER_CHECKOUT_FAILED, ORDER_CHECKOUT_REQUEST, ORDER_CHECKOUT_SUCCESS } from "../actions/orderActions"

const initialState = {
    order: null,
    orderCheckoutFailed: false,
    orderCheckoutRequest: false,
}

export const orderReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ORDER_CHECKOUT_REQUEST: {

            return {
                    ...state,
                    orderCheckoutRequest: true,
                }
            }
        case ORDER_CHECKOUT_FAILED: {

            return {
                    ...state,
                    ...state.order,
                    orderCheckoutFailed: true,
                }
     
            }
        case ORDER_CHECKOUT_SUCCESS: {

                return {
                    ...state,
                    orderCheckoutFailed: false,
                    orderCheckoutRequest: true,
                    order: action.order,
                }
            }
      
        default: {
            return state
        }
    }
}



