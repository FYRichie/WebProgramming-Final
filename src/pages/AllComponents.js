import React from 'react';
import Start from './Starting/Start';
import Login from './Login/Login';
import PersonalPage from './Personal/PersonalPage';

function AllComponents(){
    return(
        <React.StrictMode>
            <Start />
            <Login />
            <PersonalPage />
        </React.StrictMode>
    );
}

export default AllComponents;