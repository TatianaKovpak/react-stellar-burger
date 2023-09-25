
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS'; 
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_OPEN = 'WS_CONNECTION_OPEN'
export const WS_CONNECTION_CONNECT = 'WS_CONNECTION_CONNECT'
export const WS_CONNECTION_DISCONNECT = 'WS_CONNECTION_DISCONNECT'


export const WS_GET_MESSAGE = 'WS_GET_MESSAGE'

export const connect = (url) => ({
    type: WS_CONNECTION_CONNECT,
    payload: url
});

export const disconnect = () => ({
    type: WS_CONNECTION_DISCONNECT,
});