import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PersonalPage.css";
import Layer from "./Layer";
import add from "../../images/add.svg";

export default (/*buttonStates*/layers) => {
    return (
        layers.map(element => {
            <nav>
                <div className="btn-group">
                    <button className="btn-dark"><img src={add} /></button>
                </div>
            </nav>
        })
    );
}