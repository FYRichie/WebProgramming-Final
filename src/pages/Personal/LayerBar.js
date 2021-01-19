import React, { useState } from "react";
import { Menu, Button, Input, Modal, message, Col } from "antd";
import {
    PlusOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import "./PersonalPage.css";
import Layer from "./Layer";

const {SubMenu} = Menu;
const {info} = Modal;

export default (buttonStates) => {
    const [modalVisible, setModalVisible] = useState(false);
    const layerNameRef = React.useRef();
    const layerColorRef = React.useRef();

    const ColorInput = (
        <input type="color" ref={layerColorRef}/>
    );
    
    const layers = () => {
        return buttonStates.userData.layer.map((ele,index) => Layer(ele,index,buttonStates));
    };

    const showAddModal = () => {
        setModalVisible(true);
    }

    const cancelAdd = () => {
        setModalVisible(false);
    }

    const comfirmAddLayer = () => {
        if (layerNameRef.current.state.value === undefined) message.error("Please enter a layer name!");
        else if (buttonStates.userData.layer.find(ele => ele.layerName === layerNameRef.current.state.value)) message.error("There already exists a same layer!");
        else {
            const _layer = {
                layerName: layerNameRef.current.state.value,
                layerColor: layerColorRef.current.value,
                layerSelected: true,
                event: []
            }

            const newUserData = {
                userName: buttonStates.userData.userName,
                layer: [...buttonStates.userData.layer, _layer],
                somethingelse: buttonStates.userData.somethingelse
            }
            buttonStates.setUserData(newUserData);
            setModalVisible(false);
            console.log(buttonStates.userData);
        }
    }

    return (
        <div>
            <Button
                shape="circle" 
                icon={<PlusOutlined />} 
                onClick={showAddModal}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            />
            <Modal 
                title="Add a layer!"
                centered
                visible={modalVisible}
                onCancel={cancelAdd}
                footer={[
                    <Button onClick={cancelAdd}>Cancel</Button>,
                    <Button type="primary" onClick={comfirmAddLayer}>Add</Button>
                ]}
            >
                <Input placeholder="Enter a new layer name" ref={layerNameRef} suffix={ColorInput}/>
            </Modal>
            <Menu
                theme="light" 
                mode="inline"
                style={{
                    marginLeft:"2px"
                }}
            >
                {layers()}
            </Menu>
        </div>
    );
}