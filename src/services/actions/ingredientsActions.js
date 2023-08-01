import { getIngredients } from "../../utils/api-burger";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_SELECTED_INGREDIENT = 'ADD_SELECTED_INGREDIENT';
export const CHANGE_BUN = 'CHANGE_BUN'
export const DELETE_SELECTED_INGREDIENT = 'DELETE_SELECTED_INGREDIENT';
export const SORT_SELECTED_INGREDIENTS = 'SORT_SELECTED_INGREDIENTS'



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