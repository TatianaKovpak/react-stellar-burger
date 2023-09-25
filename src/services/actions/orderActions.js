import { postOrder, refreshTokenRequest } from "../../utils/api-burger";

export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const CLEAR_ORDER = 'CLEAR_ORDER'

export function getOrderData(arr) {
    const accessToken = localStorage.getItem('accessToken')
    return function(dispatch) {
        dispatch ({
            type: ORDER_CHECKOUT_REQUEST,
        })
        postOrder(arr, accessToken)
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
            if (err === "Ошибка:403" || err ==='Ошибка:401') {
                refreshTokenRequest()
                .then((res) => {
                    localStorage.setItem('refreshToken', res.refreshToken)
                    localStorage.setItem('accessToken', res.accessToken)
                    dispatch(getOrderData(arr))
                })
            } else {
                dispatch({
                    type:ORDER_CHECKOUT_FAILED
                })
            }
           
        })
        
    }
}