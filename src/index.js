import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContextWrapper from './context/ContextWrapper';
import axios from 'axios'
import {BrowserRouter} from 'react-router-dom'
console.log(process.env)
axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api/`
axios.defaults.headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
 <ContextWrapper>
    <App />
  </ContextWrapper>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

