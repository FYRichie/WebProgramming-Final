import React, { useState } from "react";
import { Menu, Button, Input, Modal, message, DatePicker, Space, InputNumber } from "antd";
import {
    PlusOutlined,
    DeleteOutlined,
    CheckOutlined,
    CloseOutlined
} from "@ant-design/icons"
import Events from "./Events";
import TimeList from "./TimeList";
import UserDataToDate from "./UserDataToDate";

const {SubMenu} = Menu;
const {RangePicker} = DatePicker;

const timeOverlapping = (interval1, interval2) => {
    return interval1.startTime.isBetween(interval2.startTime, interval2.endTime)
        || interval1.endTime.isBetween(interval2.startTime, interval2.endTime)
        || interval2.startTime.isBetween(interval1.startTime, interval1.endTime)
        || interval2.endTime.isBetween(interval1.startTime, interval1.endTime)
};

export default (ele, index, buttonStates) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [eventTime, setEventTime] = useState([]);
    const [eventRepeatEveryweek, setEventRepeatEveryweek] = useState(1);
    const eventNameRef = React.useRef();

    const events = () => {
        return ele.event.map((e, id) => Events(e, id, buttonStates, index))
    }

    const showAddModal = () => {
        setAddModalVisible(true);
    }

    const showDeleteModal = () => {
        setDeleteModalVisible(true);
    }

    const cancelAddEvevt = () => {
        setAddModalVisible(false);
    }

    const comfirmAddEvent = () => {  //repeat everyweek needs modify
        if (eventNameRef.current.state.value === undefined) message.error("Please enter an event name!");
        else if (eventTime.length === 0) message.error("Please at least select one time interval!");
        else {
            const newLayer = {
                layerName: ele.layerName,
                layerColor: ele.layerColor,
                layerSelected: true,
                event: [...ele.event, {
                    eventName: eventNameRef.current.state.value,
                    eventTime: eventTime,
                    eventRepeatEveryweek: eventRepeatEveryweek
                }]
            }

            const newUserData = {
                userName: buttonStates.userData.userName,
                layer: [...buttonStates.userData.layer.slice(0, index), newLayer, ...buttonStates.userData.layer.slice(index + 1, buttonStates.userData.layer.length)],
                somethingelse: buttonStates.userData.somethingelse
            }

            buttonStates.setUserData(newUserData);
            setAddModalVisible(false);

            console.log(UserDataToDate(buttonStates.userData));
        }
    }

    const cancelDeleteLayer = () => {
        setDeleteModalVisible(false);
    }

    const comfirmDeleteLayer = () => {
        const newUserData = {
            userName: buttonStates.userData.userName,
            layer: [...buttonStates.userData.layer.slice(0, index), ...buttonStates.userData.layer.slice(index + 1, buttonStates.userData.layer.length)],
            somethingelse: buttonStates.userData.somethingelse
        }

        buttonStates.setUserData(newUserData);
    }

    const addTime = (moment) => {
        if (moment[0] !== null && moment[1] !== null){
            if (moment[0].isBefore(moment[1])){
                const timeInterval = {
                    startTime: moment[0],
                    endTime: moment[1]
                }
                if (eventTime.find(ele => timeOverlapping(ele, timeInterval)) !== undefined) message.error("Time interval has overlapping!");
                else setEventTime([...eventTime, timeInterval]);
            }
            else message.error("Please enter a valid time interval!");
        }
    }

    const selectLayer = () => {
        const newLayer = {
            layerName: ele.layerName,
            layerColor: ele.layerColor,
            layerSelected: !ele.layerSelected,
            event: ele.event
        }
        const newUserData = {
            userName: buttonStates.userData.userName,
            layer: [...buttonStates.userData.layer.slice(0, index), newLayer, ...buttonStates.userData.layer.slice(index + 1, buttonStates.userData.layer.length)],
            somethingelse: buttonStates.userData.somethingelse
        }

        buttonStates.setUserData(newUserData);
    }

    const repeat = (value) => {
        setEventRepeatEveryweek(value);
    }

    return (
        <SubMenu
            title={ele.layerName}
            style={{
                width: "200px",
                margin: "0px 0px 0px 0px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                color: ele.layerColor
            }}
        >
            <hr 
                style={{
                    margin: "0px 3px 2.5px 3px"
                }}
            />
            {events()}
            <Modal
                title="Add an event!"
                centered
                visible={addModalVisible}
                onCancel={cancelAddEvevt}
                footer={[
                    <Button onClick={cancelAddEvevt}>Cancel</Button>,
                    <Button type="primary" onClick={comfirmAddEvent}>Add</Button>
                ]}
            >
                <Input 
                    placeholder="Enter a new event name" 
                    ref={eventNameRef}
                    style={{
                        margin: "0px 0px 0px 17px",
                        width: "438px"
                    }}
                />
                <Space>
                    <RangePicker 
                        allowEmpty={[false, false]}
                        showTime 
                        onOk={addTime}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "17px",
                            width: "438px"
                        }}
                    />
                </Space>
                {TimeList(eventTime)}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <p
                        style={{
                            margin:"0px 8px 0px 20px"
                        }}
                    >Repeat week :</p>
                    <InputNumber 
                        min={1}
                        max={75}
                        defaultValue={1}
                        onChange={repeat}
                    />
                </div>
            </Modal>
            <Modal
                title="Warning!"
                centered
                visible={deleteModalVisible}
                onCancel={cancelDeleteLayer}
                footer={[
                    <Button onClick={cancelDeleteLayer}>Cancel</Button>,
                    <Button danger onClick={comfirmDeleteLayer}>Yes</Button>
                ]}
            >
                <p>Are you sure you want to delete this layer?</p>
            </Modal>
            <hr
                style={{
                    margin: "2.5px 3px 0px 3px"
                }}
            />
            <ul 
                style={{
                    display: "flex"
                }}
            >
                <Button
                    icon={<PlusOutlined />}
                    onClick={showAddModal}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        borderColor: "transparent",
                        marginLeft: "108px",
                        height: "27px"
                    }}
                />
                <Button
                    icon={<DeleteOutlined/>} 
                    onClick={showDeleteModal}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        borderColor: "transparent",
                        height: "27px"
                    }}
                />
                <Button 
                    icon={!buttonStates.userData.layer[index].layerSelected ? <CheckOutlined /> : <CloseOutlined/>}
                    onClick={selectLayer}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        borderColor: "transparent",
                        height: "27px"
                    }}
                />
            </ul>
            {/*add selected */}
        </SubMenu>
    );
}