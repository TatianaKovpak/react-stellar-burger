import { getIngredients, postOrder } from '../../utils/api-burger';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';

export const OPEN_MODAL_ORDER = 'OPEN_MODAL_ORDER';
export const OPEN_MODAL_INGREDIENT = 'OPEN_MODAL_INGREDIENT';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const UPDATE_TYPE = 'UPDATE_TYPE';

export const ADD_SELECTED_INGREDIENT = 'ADD_SELECTED_INGREDIENT';
export const DELETE_SELECTED_INGREDIENT = 'DELETE_SELECTED_INGREDIENT';





export function getIngredientsFromServer() {
   return function(dispatch) {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    })
    getIngredients()
    .then(res => {
        if(res && res.success) {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: res.data,
            })
            
        } else {
            dispatch ({
                type: GET_INGREDIENTS_FAILED
            })
        }
    })
    .catch(err => {
        dispatch({
            type: GET_INGREDIENTS_FAILED
        })
    })
}
}


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
