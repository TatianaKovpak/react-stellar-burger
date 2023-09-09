import React from "react";
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

 const composeEnhancers =
   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
     : compose; 


const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware()) );


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





