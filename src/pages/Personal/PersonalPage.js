import "./PersonalPage.css";
import React, {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import PersonalComponent from "./PersonalComponent";
require('dotenv').config();

const URL = process.env.REACT_APP_baseURL || 'ws://localhost:80';
const client = new WebSocket(URL);

function PersonalPage(){
    const [hasAskData, setHasAskData] = useState(false);
    const [userData, setUserData] = useState(false);  //all data of specify user from DB
    const [Saved, setSaved] = useState(null);
    const [SaveLoading, setSaveLoading] = useState(false);
    const [userID, setUserID] = useState("");
    const [BTLayerBar, setBTLayerBar] = useState(false);
    const [Schedule, setSchedule] = useState(false);
    const [BTProfile, setBTProfile] = useState(false);
    const [editDrawerVisible, setEditDrawerVisible] = useState(false);
    const [layerIndex, setLayerIndex] = useState(0);
    const [eventIndex, setEventIndex] = useState(0);

    const buttonStates = {
        "userData": userData,
        "setUserData": setUserData,
        "Saved": Saved,
        "setSaved": setSaved,
        "SaveLoading": SaveLoading,
        "setSaveLoading": setSaveLoading,
        "userID": userID,
        "setUserID": setUserID,
        "BTLayerBar": BTLayerBar,
        "setBTLayerBar": setBTLayerBar,
        "Schedule": Schedule,
        "setSchedule": setSchedule,
        "BTProfile": BTProfile,
        "setBTProfile": setBTProfile,
        "editDrawerVisible": editDrawerVisible,
        "setEditDrawerVisible": setEditDrawerVisible,
        "layerIndex": layerIndex,
        "setLayerIndex": setLayerIndex,
        "eventIndex": eventIndex,
        "setEventIndex": setEventIndex
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
        }
    }

    return (
        <BrowserRouter>
            {<Route path="/Personal/" component={() => PersonalComponent(buttonStates, sendData)}></Route> }
        </BrowserRouter>
    );
}

export default PersonalPage;