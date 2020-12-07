import {NavLink} from 'react-router-dom';
import React, {useState} from 'react';

const client = new WebSocket('ws://localhost:4000');

const idGenerator = () => ('_' + Math.random().toString(36).substr(2,16));

export default () => {
    //const [dataIsValid, setDataIsValid] = useState(false);
    const [warning, setWarning] = useState('');
    
    const nameRef = React.createRef();
    const passwordRef = React.createRef();
    const passwordCerRef = React.createRef();

    const sendData = (data) => {
        client.send(JSON.stringify(data));
    };

    const submitClick = () => {
        if (nameRef.current.value !== "" && passwordRef.current.value !== "" && passwordRef.current.value === passwordCerRef.current.value){
            setWarning('');
            const data = {
                account: nameRef.current.value,
                password: passwordRef.current.value,
                ID: idGenerator()
            }
            const msg = ['CreateAccount', data];
            sendData(msg);

            client.onmessage = (message) => {
                const Mes = message.data;
                console.log(Mes);
                const [task, payload] = JSON.parse(Mes);
                switch (task){
                    case 'success':{
                        window.location.replace(window.location.origin + '/Using');
                        break;
                    }
                    case 'error':{
                        setWarning("Your entering account has already been used");
                        break;
                    }
                }
            };
        }
        else if (nameRef.current.value === ""){
            setWarning('Missing name!');
            passwordRef.current.value = "";
            passwordCerRef.current.value = "";
        }
        else if (passwordRef.current.value === "" || passwordCerRef.current.value === ""){
            setWarning('Missing password!');
            passwordRef.current.value = "";
            passwordCerRef.current.value = "";
        }
        else if (passwordRef.current.value !== passwordCerRef.current.value){
            setWarning('Password certification has some mistake!');
            passwordCerRef.current.value = "";
        }
    };

    return (
        <div>
            <h1>
                Creating Account Page
            </h1>
            <div>
                <h2 className="form-inline">
                    Please enter your name: 
                </h2>
                <input type="text" placeholder="(Name)" ref={nameRef}/>
            </div>
            <div>
                <h2 className="form-inline">
                    Please enter yout password: 
                </h2>
                <input type="text" placeholder="(Password)" ref={passwordRef}/>
            </div>
            <div>
                <h2 className="form-inline">
                    Please certify your password: 
                </h2>
                <input type="text" placeholder="(Password again)" ref={passwordCerRef}/>
            </div>
            <div>
                <button onClick={submitClick}>Submit!</button>
            </div>
            <div>
                {warning}
            </div>
        </div>
    );
}