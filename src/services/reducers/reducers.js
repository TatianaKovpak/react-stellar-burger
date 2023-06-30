import uuid from 'react-uuid'
import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, ORDER_CHECKOUT_REQUEST, ORDER_CHECKOUT_FAILED, ORDER_CHECKOUT_SUCCESS,
    OPEN_MODAL_ORDER, CLOSE_MODAL, OPEN_MODAL_INGREDIENT, ADD_SELECTED_INGREDIENT, DELETE_SELECTED_INGREDIENT, SORT_SELECTED_INGREDIENTS,
    CHANGE_BUN} from '../actions/actions'

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
        case ADD_SELECTED_INGREDIENT: {
            const id = uuid()

            return {
                ...state,
                addedIngredients: [...state.addedIngredients, { ...action.payload, id: id}] ,
               
            }
        }
     
        case CHANGE_BUN: {
            const bun = state.addedIngredients.find(item => item.type === 'bun')
            const index = state.addedIngredients.indexOf(bun)

            if(index >= 0) {
                state.addedIngredients.splice(index, 1)
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
        default: {
            return state
        }
    }
}



