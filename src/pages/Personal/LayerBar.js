import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import "./PersonalPage.css";
import Layer from "./Layer";
import add from "../../images/add.svg";
import unfold from "../../images/unfold.svg";
import {Dropdown} from "react-bootstrap";

export default (buttonStates) => {
    const nameRef = React.createRef();
    const colorRef = React.createRef();
    const layers = (buttonStates) => {
        return buttonStates.userData.layer.map((ele, index) => Layer(ele.name,ele.color,ele.selected,index,buttonStates));
    };

    const addLayer = () => {
        if (nameRef.current.value !== "" && colorRef.current.value !== "" && (buttonStates.userData.layer.find(ele => ele.name === nameRef.current.value) === undefined)){
            const _layer = {
                name: nameRef.current.value,
                color: colorRef.current.value,
                selected: true,
                strokes: []  //schedule component
            };

            const newUserData = {
                userName: buttonStates.userData.userName,
                layer: [...buttonStates.userData.layer, _layer],
                somethingelse: buttonStates.userData.somethingelse
            }

            buttonStates.setUserData(newUserData);
        }
        else if (buttonStates.userData.layer.find(ele => ele.name === nameRef.current.value) !== undefined){
            alert("Using same name!");
            nameRef.current.value = "";
        }
        else if (nameRef.current.value === ""){
            alert("Please enter a name!");
            nameRef.current.value = "";
        }
        else if (colorRef.current.value === ""){
            alert("Please choose a color!");
        }
    }

    return (
        <div className="layer-bar">
            <div className="btn-group tool-bar">
                <Dropdown>
                    <Dropdown.Toggle>
                        Add Layer
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <input type="text" placeholder="Enter a new layer name!" className="layer-name" ref={nameRef}/>
                        <div className="layer-other">
                            <div>Choose a color:<input type="color" className="layer-color-select" ref={colorRef}/></div>
                            <button className="add-button" onClick={addLayer}><img src={add} /></button>  
                        </div>  
                    </Dropdown.Menu>
                </Dropdown>
                {/*<button className="btn-dark unfold-button"><img src={unfold}/></button>*/}
            </div>
            <div className="layer-list">
                {/*add user layers*/layers(buttonStates)}
            </div>
        </div>        
    );
}