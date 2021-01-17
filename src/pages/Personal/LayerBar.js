import React, { useState } from "react";
import { Menu, Button, Input, Modal, message } from "antd";
import {
    PlusCircleOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import "./PersonalPage.css";
import Layer from "./Layer";

const {SubMenu} = Menu;

export default (buttonStates) => {
    const [modalVisible, setModalVisible] = useState(false);
    const layerRef = React.useRef();

    const layers = () => {
        //console.log(buttonStates.userData);
        return buttonStates.userData.layer.map((ele, index) => Layer(ele,index,buttonStates));
    };

    const showAddModal = () => {
        setModalVisible(true);
    }

    const cancelAdd = () => {
        setModalVisible(false);
    }

    const comfirmAdd = () => {
        if (layerRef.current.state.value === undefined) message.error("Please enter a name!");
        else if (buttonStates.userData.layer.find(ele => ele.name === layerRef.current.state.value)) message.error("There already exists a same layer!");
        else {
            const _layer = {
                name: layerRef.current.state.value,
                event: []
            }

            const newUserData = {
                userName: buttonStates.userData.userName,
                layer: [...buttonStates.userData.layer, _layer],
                somethingelse: buttonStates.userData.somethingelse
            }
            buttonStates.setUserData(newUserData);
            setModalVisible(false);
            console.log(buttonStates.userData.layer);
        }
    }

    const add = (
        <Input placeholder="Enter a new layer name!" prefix={<UnorderedListOutlined />}/>
    );

    return (
        <div>
            <Button shape="circle" icon={<PlusCircleOutlined />} onClick={showAddModal}/>
            <Modal 
                title="Add a layer!"
                centered
                visible={modalVisible}
                footer={[
                    <Button onClick={cancelAdd}>Cancel</Button>,
                    <Button type="primary" onClick={comfirmAdd}>Add</Button>
                ]}
            >
                <Input placeholder="Enter a new layer name" ref={layerRef}/>
            </Modal>
            <Menu theme="light" mode="vertical">
                {layers()}
            </Menu>
        </div>
    );
}