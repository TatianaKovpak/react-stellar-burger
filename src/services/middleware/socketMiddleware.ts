import {TWsConnectionActions, WS_CONNECTION_CLOSED, WS_CONNECTION_CONNECT, WS_CONNECTION_DISCONNECT, WS_CONNECTION_ERROR, WS_CONNECTION_OPEN, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../actions/socketMiddlewareActions";
import { MiddlewareAPI, Dispatch, Middleware} from 'redux';
import { RootState, AppDispatch } from "../types";

export type TSocketMiddlewareActions = {
    wsConnect: typeof WS_CONNECTION_CONNECT;
    onOpen: typeof WS_CONNECTION_OPEN;
    onClose: typeof WS_CONNECTION_CLOSED;
    onError: typeof WS_CONNECTION_ERROR;
    onMessage: typeof WS_GET_MESSAGE;
    wsConnecting: typeof WS_CONNECTION_SUCCESS;
    wsDisconnect: typeof WS_CONNECTION_DISCONNECT
}
     
    
export const socketMiddleware = (wsActions: TSocketMiddlewareActions ): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
       
        let socket: WebSocket | null = null;


        return (next: Dispatch) => (action: TWsConnectionActions) => {
            const { dispatch } = store;
            const { type } = action;
            const {
                wsConnect,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting,
                wsDisconnect,
            } = wsActions;

            if (type === wsConnect) {
                socket = new WebSocket(action.payload);
                dispatch({type: wsConnecting});
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };

                socket.onerror = () => {
                    dispatch({ type: onError, payload: 'Error' });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    dispatch({ type: onMessage, payload: parsedData });
                };

                socket.onclose = () => {
                    dispatch({ type: onClose });
                };

 
                if (type === wsDisconnect) {
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        };
    };
};
    
