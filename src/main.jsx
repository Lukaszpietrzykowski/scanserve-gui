import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/inter';

import "./main.css"
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = 'http://192.168.0.178:8080'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
)
