import {NavLink} from 'react-router-dom';
import React, {useState} from 'react';

const client = new WebSocket('ws://localhost:4000');

export default () => {
    //const [dataIsValid, setDataIsValid] = useState(false);
    const [toWhere, setToWhere] = useState('/CreateAccount');
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
                password: passwordRef.current.value
            }
            const msg = ['CreateAccount', data];
            //send to backend
            if (/* backend says correct,start using*/true){
                setToWhere('/start');
            }
            else {
                setWarning('Your account or password has some mistake! Please try again.');
            }
        }
        else if (nameRef.current.value === ""){
            setWarning('Missing name!');
            setToWhere('/CreateAccount');
            passwordRef.current.value = "";
            passwordCerRef.current.value = "";
        }
        else if (passwordRef.current.value === "" || passwordCerRef.current.value === ""){
            setWarning('Missing password!');
            setToWhere('/CreateAccount');
            passwordRef.current.value = "";
            passwordCerRef.current.value = "";
        }
        else if (passwordRef.current.value !== passwordCerRef.current.value){
            setWarning('Password certification has some mistake!');
            setToWhere('/CreateAccount');
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
                <NavLink to={toWhere}><button onClick={submitClick}>Submit!</button></NavLink>
            </div>
            <div>
                {warning}
            </div>
        </div>
    );
}