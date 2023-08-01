import { OPEN_MODAL_INGREDIENT, OPEN_MODAL_ORDER, CLOSE_MODAL } from '../actions/modalActions'

const initialState = {
    modalOpened: {
        opened: false,
        propsModal: {
            typeBtn: null,
            propsBtn: {}
        }
    },
}

export const modalReducer = (state = initialState, action) => {
    
    switch (action.type) {
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

        default: {
            return state
        }
    }
}