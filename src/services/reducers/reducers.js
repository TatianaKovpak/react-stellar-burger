import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from '../actions/actions'

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    addedIngredients: [],
    ingredientOpened: {},
    order: {},
}
// Для обработки 
export const reducer = (ingredients = initialState, action) => {
    console.log(action, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS)
    switch (action.type) {
        case  GET_INGREDIENTS_REQUEST: {
            console.log(action)
            return {
            ...ingredients,
            ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            console.log(action)
            return {
                ...ingredients,
                ingredientsFailed: false,
                ingredientsRequest: false,
                ingredients: action.ingredients
            }
        }
        case GET_INGREDIENTS_FAILED: {
            console.log(action)
            return {
                ...ingredients,
                ingredientsFailed: true,
                ingredientsRequest: false

                }
            }
        default: {
            console.log(ingredients)
            return ingredients
        }
    }
}