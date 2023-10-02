import { rootReducer } from "./reducers";
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { TSocketMiddlewareActions, socketMiddleware } from "./middleware/socketMiddleware";
import { WS_GET_MESSAGE, WS_CONNECTION_CLOSED, WS_CONNECTION_CONNECT, WS_CONNECTION_DISCONNECT,WS_CONNECTION_ERROR,WS_CONNECTION_OPEN,WS_CONNECTION_SUCCESS } from "./actions/socketMiddlewareActions";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

// const composeEnhancers =
// typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// //   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose; 

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const feedMiddleware: TSocketMiddlewareActions = ({
   wsConnect: WS_CONNECTION_CONNECT,
   wsDisconnect: WS_CONNECTION_DISCONNECT ,
   wsConnecting: WS_CONNECTION_SUCCESS,
   onError: WS_CONNECTION_ERROR,
   onMessage: WS_GET_MESSAGE,
   onOpen: WS_CONNECTION_OPEN,
   onClose: WS_CONNECTION_CLOSED
 });


const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(feedMiddleware)) );



export const store = createStore(rootReducer, enhancer); 