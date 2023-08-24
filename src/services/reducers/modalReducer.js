import { OPEN_MODAL_INGREDIENT, OPEN_MODAL_ORDER, CLOSE_MODAL } from '../actions/modalActions'

const initialState = {
    isDetails: false,
    isIngredient: false,
    content: {}
}

export const modalReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case OPEN_MODAL_ORDER: {
            return {
                ...state,
                isDetails: true,
                isIngredient: false,
                content: {}

            }
        }
        case OPEN_MODAL_INGREDIENT: {
            return {
                ...state,
                isDetails: false,
                isIngredient: true,
                content: action.payload
            }
        }
   
        case CLOSE_MODAL: {
            return {
                ...state,
               isDetails: false,
               isIngredient: false
            }
        }

        default: {
            return state
        }
    }
}