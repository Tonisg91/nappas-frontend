import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { default as store } from './store'
import './configs/axios'
import { HandlerContextProvider } from './context/HandlerContext'



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HandlerContextProvider>
        <Router>
          <App />
        </Router>
      </HandlerContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (process.env.REACT_APP_NODE_ENV === 'dev') reportWebVitals(console.log)