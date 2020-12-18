import React, { useState } from "react";
import {Layout, Menu, Button, Input, Drawer} from "antd";
import {
    PlusCircleOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import "./PersonalPage.css";
import Layer from "./Layer";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

export default (buttonStates) => {
    const [aL, setAL] = useState(false);
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
    const add = (
        <Input placeholder="Enter a new layer name!" prefix={<UnorderedListOutlined />}/>
    );

    return (
        /*<div className="layer-bar">
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
            </div>
            <div className="layer-list">
                {layers(buttonStates)}
            </div>
        </div>*/
        <div>
            <div className="logo"/>
            testing
        </div>
        /*<Sider>
            <Button type="primary" shape="round" icon={<PlusCircleOutlined />} onClick={setAL(true)}>
                Add a layer!
            </Button>
            <Drawer 
                title="Add a new layer!" 
                width={250} 
                onClose={setAL(false)}
                visible={aL}
                footer={
                    <div
                      style={{
                        textAlign: 'left',
                      }}
                    >
                      <Button onClick={setAL(false)} style={{ marginRight: 8 }}>
                        Cancel
                      </Button>
                      <Button onClick={() => {alert("not finised")}} type="primary">
                        Submit
                      </Button>
                    </div>
                  }
            >
                
                </Drawer>
            <Menu>

            </Menu>
        </Sider>*/
    );
}