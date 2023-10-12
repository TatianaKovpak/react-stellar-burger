import { postOrder, refreshTokenRequest } from "../../utils/api-burger";
import { AppDispatch, AppThunk } from "../types";
import { TIngredient } from "../types/data";

export const ORDER_CHECKOUT_REQUEST: 'ORDER_CHECKOUT_REQUEST' = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_FAILED: 'ORDER_CHECKOUT_FAILED' = 'ORDER_CHECKOUT_FAILED';
export const ORDER_CHECKOUT_SUCCESS: 'ORDER_CHECKOUT_SUCCESS' = 'ORDER_CHECKOUT_SUCCESS';
export const CLEAR_ORDER: 'CLEAR_ORDER' = 'CLEAR_ORDER'

export interface IOrderCheckoutRequest {
    readonly type: typeof ORDER_CHECKOUT_REQUEST;
};

export interface IOrderCheckoutFailed {
    readonly type: typeof ORDER_CHECKOUT_FAILED;
};

export interface IOrderCheckoutSuccess {
    readonly type: typeof ORDER_CHECKOUT_SUCCESS;
    order: number
};

export interface IClearOrder {
    readonly type: typeof CLEAR_ORDER;
};

export type TOrderActions = | IOrderCheckoutRequest | IOrderCheckoutFailed | IOrderCheckoutSuccess | IClearOrder

export const getOrderData: AppThunk = (arr: string[]) => (dispatch: AppDispatch) => {
    const accessToken = localStorage.getItem('accessToken')
        dispatch ({
            type: ORDER_CHECKOUT_REQUEST,
        })
        if(accessToken) {
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
                    // dispatch(getOrderData(arr))
                    getOrderData(arr)
                })
            } else {
                dispatch({
                    type:ORDER_CHECKOUT_FAILED
                })
            }
           
        })
    }
        
    
}

