import "./PersonalPage.css";
import React, {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import PersonalComponent from "./PersonalComponent";

const client = new WebSocket('ws://localhost:4000');

function PersonalPage(){
    const [hasAskData, setHasAskData] = useState(false);
    const [userData, setUserData] = useState(false);  //all data of specify user from DB
    const [Saved, setSaved] = useState(null);
    const [SaveLoading, setSaveLoading] = useState(false);
    const [userID, setUserID] = useState("");

    const buttonStates = {
        "userData": userData,
        "setUserData": setUserData,
        "Saved": Saved,
        "setSaved": setSaved,
        "SaveLoading": SaveLoading,
        "setSaveLoading": setSaveLoading,
        "userID": userID,
        "setUserID": setUserID
    }

    const servingUrl = window.location.pathname;
    const sendData = (data) => {
        client.send(JSON.stringify(data));
    }

    const {personalComponent} = PersonalComponent(buttonStates, sendData);

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
                        setUserData(payload.data);
                        setUserID(payload.ID);
                        break;
                    }
                    case 'error':{
                        setUserData(false);
                        break;
                    }
                    case 'save':{
                        if (payload === "success") setSaved(true);
                        else if (payload === "error") setSaved(false);
                        setSaveLoading(false);
                        break;
                    }
                }
            }
        }
    }

    return (
        <BrowserRouter>
            {<Route path="/Personal/" component={personalComponent}></Route> }
        </BrowserRouter>
    );
}

export default PersonalPage;