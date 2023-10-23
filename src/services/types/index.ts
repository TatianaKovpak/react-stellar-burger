import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { store } from '../store';
import { TIngredientsActions } from '../actions/ingredientsActions';
import { TModalActions } from '../actions/modalActions';
import { TOrderActions } from '../actions/orderActions';
import { TWsConnectionActions } from '../actions/socketMiddlewareActions';
import { TUserActions } from '../actions/userActions';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TIngredientsActions | TModalActions | TOrderActions | TWsConnectionActions | TUserActions

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch; 

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 