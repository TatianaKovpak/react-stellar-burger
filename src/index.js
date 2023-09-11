import ReactDOM from "react-dom";
import "./index.css";
import "./fonts/fonts.css"
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import { rootReducer } from "./services/reducers";
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from "react-router-dom";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import { WS_GET_MESSAGE, WS_CONNECTION_CLOSED, WS_CONNECTION_CONNECT, WS_CONNECTION_DISCONNECT,WS_CONNECTION_ERROR,WS_CONNECTION_OPEN,WS_CONNECTION_SUCCESS } from "./services/actions/socketMiddlewareActions";

 const composeEnhancers =
   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
     : compose; 

     const feedMiddleware = ({
      wsConnect: WS_CONNECTION_CONNECT,
      wsDisconnect: WS_CONNECTION_DISCONNECT ,
      wsConnecting: WS_CONNECTION_SUCCESS,
      onError: WS_CONNECTION_ERROR,
      onMessage: WS_GET_MESSAGE,
      onOpen: WS_CONNECTION_OPEN,
      onClose: WS_CONNECTION_CLOSED
    });


const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(feedMiddleware)) );



const store = createStore(rootReducer, enhancer); 

ReactDOM.render(
  <>
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





