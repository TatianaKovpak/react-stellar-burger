import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { orderReducer } from './orderReducer'
import { modalReducer } from './modalReducer';
import { userReducer } from './userReducer';
import { socketMiddlewareReducer } from './socketMiddlewareReducer';


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    modal: modalReducer,
    user: userReducer,
    orders: socketMiddlewareReducer
  });