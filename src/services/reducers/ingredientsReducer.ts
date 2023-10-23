import { CLEAR_CONSTRUCTOR, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, ADD_SELECTED_INGREDIENT, CHANGE_BUN, DELETE_SELECTED_INGREDIENT, SORT_SELECTED_INGREDIENTS, TIngredientsActions } from "../actions/ingredientsActions"
import uuid from 'react-uuid'
import {  TIngredient } from "../types/data"

export type TIngredientsState = {
    ingredients : ReadonlyArray<TIngredient>;
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    addedIngredients: Array<TIngredient>
}

const initialState: TIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    addedIngredients: []
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
    switch (action.type) {
        case  GET_INGREDIENTS_REQUEST: {
            return {
            ...state,
            ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsFailed: false,
                ingredientsRequest: true,
                ingredients: action.ingredients
            }
        }
        case GET_INGREDIENTS_FAILED: {

            return {
                ...state,
                ...state.ingredients,
                ingredientsFailed: true,
                ingredientsRequest: false

                }
            }
            case ADD_SELECTED_INGREDIENT: {
                const id = uuid()
    
                return {
                    ...state,
                    addedIngredients: [...state.addedIngredients, { ...action.payload, id: id}] ,
                   
                }
            }
         
            case CHANGE_BUN: {
                    const bun: TIngredient | undefined = state.addedIngredients.find(item => item.type === 'bun')
                    let index: number

                    if(bun) {
                        index = state.addedIngredients.indexOf(bun)
                        if(index >= 0) {
                            state.addedIngredients.splice(index, 1)
                        }
                    }

                return {
                    ...state,
                    addedIngredients: [...state.addedIngredients, ...state.ingredients.filter(item =>  item._id === action.payload)]
                }
    
            }
            case DELETE_SELECTED_INGREDIENT: {
    
                return {
                    ...state,
                    addedIngredients: [...state.addedIngredients.filter(item => item.id !== action.payload)]
                    
                }
            }
            case SORT_SELECTED_INGREDIENTS: {
               
                return {
                    ...state,
                    addedIngredients: action.payload
                }
    
            }

            case CLEAR_CONSTRUCTOR: {
                return {
                    ...state,
                    addedIngredients: []
              
                    
                }
            }
            default: {
                return state
            }
    }

}