import "./PersonalPage.css";
import React, {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import PersonalComponent from "./PersonalComponent";

const client = new WebSocket('ws://localhost:4000');

function PersonalPage(){
    const [hasAskData, setHasAskData] = useState(false);
    const [userData, setUserData] = useState(false);  //all data of specify user from DB
    const servingUrl = window.location.pathname;
    const sendData = (data) => {
        client.send(JSON.stringify(data));
    }

    if (servingUrl.length > 1){
        if (servingUrl[10] === "_"){
            const ID = servingUrl.slice(10, servingUrl.length);
            if (!hasAskData){
                client.onopen = () => {
                    sendData(['userData', ID]);
                }
                setHasAskData(true);
            }

            client.onmessage = (message) => {
                const Mes = message.data;
                const [task, payload] = JSON.parse(Mes);
                switch (task){
                    case 'success':{
                        setUserData(payload);
                        break;
                    }
                    case 'error':{
                        setUserData(false);
                        break;
                    }
                }
            }
        }
    }
    console.log(userData);

    return (
        <BrowserRouter>
            <Route path="/Personal/" component={() => {
                return PersonalComponent(userData)
            }}></Route>
        </BrowserRouter>
    );
}

export default PersonalPage;