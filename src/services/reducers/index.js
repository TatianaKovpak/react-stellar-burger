import { combineReducers } from 'redux';
import { reducer } from './reducers';

export const rootReducer = combineReducers({
    burgerIngredients: reducer
  });