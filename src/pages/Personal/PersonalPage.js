import "./PersonalPage.css";
import React, {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import PersonalComponent from "./PersonalComponent";

const client = new WebSocket('ws://localhost:4000');

function PersonalPage(){
    const [hasAskData, setHasAskData] = useState(false);
    const [userData, setUserData] = useState(false);  //all data of specify user from DB
    const [BTProfile, setBTProfile] = useState(false);
    const [BTLayerBar, setBTLayerBar] = useState(false);
    const [BTLogout, setBTLogout] = useState(false);
    const [BTAddLayer, setBTAddLayer] = useState(false);
    const [BTSaveData, setBTSaveData] = useState(false);
    const [Saved, setSaved] = useState(null);
    const [SaveLoading, setSaveLoading] = useState(false);
    const [userID, setUserID] = useState("");
    const [Schedule, setSchedule] = useState(false);
    const [Logout, setLogout] = useState(false);

    const buttonStates = {
        "BTProfile": BTProfile,
        "setBTProfile": setBTProfile,
        "BTLayerBar": BTLayerBar,
        "setBTLayerBar": setBTLayerBar,
        "BTLogout": BTLogout,
        "setBTLogout": setBTLogout,
        "userData": userData,
        "setUserData": setUserData,
        "BTAddLayer": BTAddLayer,
        "setBTAddLayer": setBTAddLayer,
        "BTSaveData": BTSaveData,
        "setBTSaveData": setBTSaveData,
        "Saved": Saved,
        "setSaved": setSaved,
        "SaveLoading": SaveLoading,
        "setSaveLoading": setSaveLoading,
        "Schedule": Schedule,
        "setSchedule": setSchedule,
        "Logout": Logout,
        "setLogout": setLogout
    }

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

            if (BTSaveData){
                sendData(['save', {
                    ID: userID,
                    data: userData
                }]);
                setSaveLoading(true);
                setBTSaveData(false);
            }

            if (Logout){
                sendData(['save', {
                    ID: userID,
                    data: userData
                }]);
                //sendData(["logout", userID]);
                setLogout(false);
                // window.location = ``
                console.log(window.location);
                window.location.href = "http://localhost:3000";
            }
        }
    }

    return (
        <BrowserRouter>
            <Route path="/Personal/" component={() => {
                return PersonalComponent(buttonStates)
            }}></Route>
        </BrowserRouter>
    );
}

export default PersonalPage;