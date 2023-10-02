import { ORDER_CHECKOUT_FAILED, ORDER_CHECKOUT_REQUEST, ORDER_CHECKOUT_SUCCESS, CLEAR_ORDER, TOrderActions } from "../actions/orderActions"

export type TOrderState = {
    order: number | null;
    orderCheckoutFailed: boolean;
    orderCheckoutRequest : boolean;
}
const initialState: TOrderState = {
    order: null,
    orderCheckoutFailed: false,
    orderCheckoutRequest: false,
}

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    
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
                    // ...state.order,
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
            case CLEAR_ORDER: {
                return {
                    ...state,
                    order: null
                }
            }
      
        default: {
            return state
        }
    }
}



