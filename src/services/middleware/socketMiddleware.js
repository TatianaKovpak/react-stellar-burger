

/*export const socketMiddleware = () => {
    return (store => {
        let socket = null

    
    return next => action => {
        const { dispatch, getState } = store;
        const { type, payload } = action;
        

        // console.log(getState(), payload)
       


        if (type === 'WS_CONNECTION_START') {
        socket = new WebSocket(action.payload)
      
        }
        if (socket) {

        socket.onopen = event => {
            dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };
          
        socket.onerror = event => {
            dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };
          
        socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data)
            
            dispatch({ type: 'WS_GET_MESSAGE', payload: parsedData });
           

    
           
        };
         socket.onclose = event => {
            dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        }
        next(action);
        
    }
    })
   
        
};*/
              
          
export const socketMiddleware = (wsActions) => {
    return store => {
        let socket = null;

        return next => action => {
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
    
