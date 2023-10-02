import { OPEN_MODAL_INGREDIENT, OPEN_MODAL_ORDER, CLOSE_MODAL, OPEN_MODAL_ORDER_DETAILS, TModalActions } from '../actions/modalActions'
import { TIngredient } from '../types/data';


export type TModalState = {
    isDetails: boolean;
    isIngredient: boolean;
    isOrder: boolean;
    content: TIngredient | object
}
const initialState: TModalState = {
    isDetails: false,
    isIngredient: false,
    isOrder: false,
    content: {}
}

export const modalReducer = (state = initialState, action: TModalActions): TModalState => {
    
    switch (action.type) {
        case OPEN_MODAL_ORDER: {
            return {
                ...state,
                isDetails: true,
                isIngredient: false,
                isOrder:false,
                content: {}

            }
        }
        case OPEN_MODAL_INGREDIENT: {
            return {
                ...state,
                isDetails: false,
                isIngredient: true,
                isOrder:false,
                content: action.payload
            }
        }
        case OPEN_MODAL_ORDER_DETAILS: {
            return {
                ...state,
                isDetails: false,
                isIngredient: false,
                isOrder: true
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