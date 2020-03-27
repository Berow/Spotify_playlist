import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';


import App from "./components/main/main";

import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);