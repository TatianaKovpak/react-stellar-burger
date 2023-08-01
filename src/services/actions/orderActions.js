import { postOrder } from "../../utils/api-burger";

export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';

export function getOrderData(arr) {
    return function(dispatch) {
        dispatch ({
            type: ORDER_CHECKOUT_REQUEST,
        })
        postOrder(arr)
        .then(res => {
            if(res && res.success) {
                
                dispatch({
                    type: ORDER_CHECKOUT_SUCCESS,
                    order: res.order.number,

                })
            } else {
                dispatch({
                    type: ORDER_CHECKOUT_FAILED,
                })
            }
        })
        .catch(err => {
            dispatch({
                type:ORDER_CHECKOUT_FAILED
            })
        })
        
    }
}