import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Start from './pages/Starting/Start';
import Login from './pages/Login/Login'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Start />
    <Login />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
