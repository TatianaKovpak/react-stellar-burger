import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, ORDER_CHECKOUT_REQUEST, ORDER_CHECKOUT_FAILED, ORDER_CHECKOUT_SUCCESS,
    OPEN_MODAL_ORDER, CLOSE_MODAL, OPEN_MODAL_INGREDIENT, UPDATE_TYPE, ADD_SELECTED_INGREDIENT, DELETE_SELECTED_INGREDIENT} from '../actions/actions'

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    addedIngredients: [],

    modalOpened: {
        opened: false,
        propsModal: {
            typeBtn: null,
            propsBtn: {}
        }
    },

    order: null,
    orderCheckoutFailed: false,
    orderCheckoutRequest: false,

}

console.log(initialState.addedIngredients)
// Для обработки 
export const reducer = (state = initialState, action) => {
    
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
                ingredientsFailed: true,
                ingredientsRequest: false

                }
            }
        case ORDER_CHECKOUT_REQUEST: {
            return {
                    ...state,
                    orderCheckoutRequest: true,
                }

            }
        case ORDER_CHECKOUT_FAILED: {
            return {
                    ...state,
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
        case OPEN_MODAL_ORDER: {
            return {
                ...state,
                modalOpened : {
                    ...state.modalOpened,
                    opened : true,
                    propsModal: {
                        typeBtn: 'order',
                        propsBtn: {}
                    }
                }
            }
        }    
        case OPEN_MODAL_INGREDIENT :{
            
            return {
                ...state,
                modalOpened : {
                    ...state.modalOpened,
                    opened : true,
                    propsModal: {
                        typeBtn: 'ingredient',
                        propsBtn: action.propsBtn,
                    }
                }
            }
        }

        case CLOSE_MODAL: {
            return {
                ...state,
                modalOpened : {
                    ...state.modalOpened,
                    opened : false,

                }
            }
        }

       /* case UPDATE_TYPE: {
            return {
                ...state,
                ingredients: state.ingredients.map(i => {
                    i._id === action._id ? {...i, board: action.board} : i
                })
            }
        }*/
        case ADD_SELECTED_INGREDIENT: {
            console.log(action.action)
            return {
                ...state,
                addedIngredients: [...state.addedIngredients, ...state.ingredients.filter(item => item._id === action.action)],
            }
        }
        case DELETE_SELECTED_INGREDIENT: {
            return {
                ...state,
                addedIngredients: [...state.addedIngredients.filter(item => item._id === !action._id)]
            }
        }
         
        default: {
            return state
        }
    }
}