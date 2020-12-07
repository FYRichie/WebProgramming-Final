import {NavLink} from 'react-router-dom';
import React ,{useState} from 'react';

const client = new WebSocket('ws://localhost:4000');

export default () => {
    const [warning, setWarning] = useState('');

    const inputAccountRef = React.createRef();
    const inputPasswordRef = React.createRef();

    const sendData = (data) => {
        client.send(JSON.stringify(data));
    };

    const resetInput = () => {
        inputAccountRef.current.value = "";
        inputPasswordRef.current.value = "";
        setWarning('');
    };

    const loginClick = () => {
        if (inputAccountRef.current.value === "") {
            setWarning('Missing account!');
            inputPasswordRef.current.value = "";
        }
        else if (inputPasswordRef.current.value === "") setWarning("Missing password!");
        else {
            const data = {
                account: inputAccountRef.current.value,
                password: inputPasswordRef.current.value
            };
            const msg = ['login', data];

            if (inputAccountRef.current.value === "clearDB"){  //defualt to clean data base
                sendData(['clearDB']);
            }
            else {
                sendData(msg);
            }
            client.onmessage = (message) => {
                const Mes = message.data;
                console.log(Mes);
                const [task, payload] = JSON.parse(Mes);
                switch (task){
                    case 'success':{
                        window.location.replace(window.location.origin + '/Using');  //need to be set to personal url,still needs modify
                        break;
                    }
                    case 'error':{
                        setWarning("Your entering account or password has some mistake! Please try it again!");
                        break;
                    }
                }
            }
        }
    };
    return (
        <div>
            <h1>
                Login page
            </h1>
            <div>
                <input type="text" placeholder="Please enter your account" ref={inputAccountRef}/>
            </div>
            <div>
                <input type="text" placeholder="Please enter your password" ref={inputPasswordRef}/>
            </div>
            <div>
                <button onClick={resetInput}>Reset</button> 
                <button onClick={loginClick}>Login</button>
                <NavLink to="/CreateAccount"><button>Start New!</button></NavLink>
            </div>
            <div>
                {warning}
            </div>
        </div>
    );
}