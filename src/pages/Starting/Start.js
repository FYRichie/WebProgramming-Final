import React, {useState} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import StartComponent from './StartComponent';

function Start(){
    return(
        <BrowserRouter>
            <Route exact path='/' component={StartComponent}/>
        </BrowserRouter>
    );
}

export default Start;