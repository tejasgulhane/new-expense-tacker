import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom"
import './index.css';
import App from './App';
import store from './components/store/indexReducer'
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store= {store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
, document.getElementById('root'));
