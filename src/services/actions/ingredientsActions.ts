
import { getIngredients } from "../../utils/api-burger";
import {  AppThunk } from "../types";
import {  TIngredient } from "../types/data";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const ADD_SELECTED_INGREDIENT: 'ADD_SELECTED_INGREDIENT' = 'ADD_SELECTED_INGREDIENT';
export const CHANGE_BUN: 'CHANGE_BUN' = 'CHANGE_BUN'
export const DELETE_SELECTED_INGREDIENT: 'DELETE_SELECTED_INGREDIENT' = 'DELETE_SELECTED_INGREDIENT';
export const SORT_SELECTED_INGREDIENTS: 'SORT_SELECTED_INGREDIENTS' = 'SORT_SELECTED_INGREDIENTS';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR'

export interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: TIngredient[];
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IAddSelectedIngredientAction {
    readonly type: typeof ADD_SELECTED_INGREDIENT;
    payload: TIngredient;
}

export interface IChangeBunActions {
    readonly type: typeof CHANGE_BUN;
    payload: string;
    
}

export interface IDeleteSelectedIngredientAction {
    readonly type: typeof DELETE_SELECTED_INGREDIENT;
    payload: string
}

export interface ISortSelectedIngredientAction {
    readonly type: typeof SORT_SELECTED_INGREDIENTS;
    payload: TIngredient[]
}

export interface IClearConstructorAction {
    readonly type: typeof CLEAR_CONSTRUCTOR;
    payload: string
}

export type TIngredientsActions = | IGetIngredientsAction | IGetIngredientsSuccessAction | IGetIngredientsFailedAction | IAddSelectedIngredientAction |
IChangeBunActions | IDeleteSelectedIngredientAction | ISortSelectedIngredientAction | IClearConstructorAction

export const getIngredientsFromServer : AppThunk = () => (dispatch) => {
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

