import { TOrders } from "../types/data";

export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'; 
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_OPEN: 'WS_CONNECTION_OPEN' = 'WS_CONNECTION_OPEN'
export const WS_CONNECTION_CONNECT: 'WS_CONNECTION_CONNECT' = 'WS_CONNECTION_CONNECT'
export const WS_CONNECTION_DISCONNECT: 'WS_CONNECTION_DISCONNECT' = 'WS_CONNECTION_DISCONNECT'
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE'

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    
}
export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    payload: string;
}
export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
}
export interface IWsConnectionOpen {
    readonly type: typeof WS_CONNECTION_OPEN
}
export interface IWsConnectionConnect {
    readonly type: typeof WS_CONNECTION_CONNECT;
    payload: string
    
}
export interface IWsConnectionDisconnect{
    readonly type: typeof WS_CONNECTION_DISCONNECT
}
export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    payload: TOrders
}

export type TWsConnectionActions = | IWsConnectionSuccess | IWsConnectionError | IWsConnectionClosed | IWsConnectionOpen 
        | IWsConnectionConnect | IWsConnectionDisconnect | IWsGetMessage



export const connect = (url: string) => ({
    type: WS_CONNECTION_CONNECT,
    payload: url
});

export const disconnect = () => ({
    type: WS_CONNECTION_DISCONNECT,
});