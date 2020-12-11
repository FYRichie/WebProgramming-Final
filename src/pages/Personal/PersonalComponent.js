import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PersonalPage.css";
import profile from "../../images/profile.svg";
import schedule from "../../images/schedule.svg";
import logout from "../../images/logout.svg";
import LayerBar from "./LayerBar";

export default (buttonStates) => {
    const layerBlock = () => {
        if (buttonStates.BTSchedule && !buttonStates.BTProfile && !buttonStates.BTLogout) {
            return (
                LayerBar(buttonStates)
            );
        }
    }

    if (!buttonStates.userData) return (
        <h1>
            Wrong URL!
        </h1>
    );
    else {
        return (
            <React.Fragment>
                <div className="page-align">
                    <div className="btn-group-vertical bg-dark select-bar">
                        {/*select bar,unsizeable*/}
                        <button className="btn-dark select-button" type="button" onClick={() => {
                            buttonStates.setBTProfile(!buttonStates.BTProfile);
                            buttonStates.setBTSchedule(false);
                            buttonStates.setBTLogout(false);
                        } }><img src={profile}/></button>
                        <button className="btn-dark select-button" type="button" onClick={() => {
                            buttonStates.setBTProfile(false);
                            buttonStates.setBTSchedule(!buttonStates.BTSchedule);
                            buttonStates.setBTLogout(false);
                        }}><img src={schedule}/></button>
                        <button className="btn-dark select-button logout-button" type="button" onClick={() => {
                            buttonStates.setBTProfile(false);
                            buttonStates.setBTSchedule(false);
                            buttonStates.setBTLogout(!buttonStates.BTLogout);
                        }}><img src={logout}/></button>
                    </div>
                    {layerBlock()}
                    <div>
                        
                    </div>
                </div>
            </React.Fragment>
        );
    }
};