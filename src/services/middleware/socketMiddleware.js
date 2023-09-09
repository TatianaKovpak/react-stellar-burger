

export const socketMiddleware = () => {
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
   
        
};
              
          
    
    
