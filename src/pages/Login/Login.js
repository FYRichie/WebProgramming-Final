import './Login.css';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginStart from'./LoginStart';
import LoginCreateAccount from './LoginCreateAccount'

function Login() {
    return (
        <BrowserRouter>
            {/*add other components to become more ornamental*/}
            <Route exact path='/Login' component={LoginStart}/>
            <Route exact path='/CreateAccount' component={LoginCreateAccount}/>
        </BrowserRouter>
    );
};

export default Login;