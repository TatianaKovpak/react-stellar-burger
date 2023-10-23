import { TIngredient } from "../types/data";

export const OPEN_MODAL_ORDER: 'OPEN_MODAL_ORDER' = 'OPEN_MODAL_ORDER';
export const OPEN_MODAL_INGREDIENT: 'OPEN_MODAL_INGREDIENT' = 'OPEN_MODAL_INGREDIENT';
export const OPEN_MODAL_ORDER_DETAILS: 'OPEN_MODAL_ORDER_DETAILS' = 'OPEN_MODAL_ORDER_DETAILS'
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';

export interface IOpenModalOrder {
    readonly type: typeof  OPEN_MODAL_ORDER
}

export interface IOpenModalIngredient {
    readonly type: typeof OPEN_MODAL_INGREDIENT;
    payload: TIngredient
}

export interface IOpenModalOrderDetails {
    readonly type: typeof OPEN_MODAL_ORDER_DETAILS
}

export interface ICloseModal {
    readonly type: typeof CLOSE_MODAL
}

export type TModalActions = | IOpenModalOrder | IOpenModalIngredient | IOpenModalOrderDetails | ICloseModal