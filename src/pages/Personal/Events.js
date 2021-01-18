import { Menu, Modal, Button } from "antd";
import {
    DeleteOutlined
} from "@ant-design/icons";
import { useState } from "react";

export default (ele, eventIndex, buttonStates, layerIndex) => {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const showDeleteEventModal = () => {
        setDeleteModalVisible(true)
    }

    const cancelDeleteEvent = () => {
        setDeleteModalVisible(false);
    }

    const comfirmDeleteEvent = () => {
        const newLayer = {
            layerName: buttonStates.userData.layer[layerIndex].layerName,
            event: [...buttonStates.userData.layer[layerIndex].event.slice(0, eventIndex), ...buttonStates.userData.layer[layerIndex].event.slice(eventIndex + 1, buttonStates.userData.layer[layerIndex].event.length)]
        }

        const newUserData = {
            userName: buttonStates.userData.userName,
            layer: [...buttonStates.userData.layer.slice(0, layerIndex), newLayer, ...buttonStates.userData.layer.slice(layerIndex + 1, buttonStates.userData.layer.length)],
            somethingelse: buttonStates.userData.somethingelse
        }

        buttonStates.setUserData(newUserData);
        setDeleteModalVisible(false);
    }

    return (
        <Menu.Item
            key={String(eventIndex)}
            style={{
                display: "flex",
                alignItems: "center",
                height: "20px",
                justifyContent: "space-between",
                margin: "2.5px 0px 2.5px 0px"
            }}
        >
            {ele.eventName}
            <DeleteOutlined
                onClick={showDeleteEventModal}
                style={{
                    marginRight: "0px"
                }}
            />
            <Modal
                title="Warning!"
                centered
                visible={deleteModalVisible}
                onCancel={cancelDeleteEvent}
                footer={[
                    <Button onClick={cancelDeleteEvent}>Cancel</Button>,
                    <Button danger onClick={comfirmDeleteEvent}>Yes</Button>
                ]}
            >
                <p>Are you sure you want to delete this event?</p>
            </Modal>
        </Menu.Item>
    );
}