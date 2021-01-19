import React, { useState } from "react";
import { Layout, Menu, message, Spin, Modal, Button, Result } from "antd";
import {
    UserOutlined,
    ScheduleOutlined,
    LogoutOutlined,
    SaveOutlined
} from "@ant-design/icons";
import "antd/dist/antd.css"
import "./PersonalPage.css";
import LayerBar from "./LayerBar";
import Demo from "./Demo";
import Profile from "./Profile";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

export default (buttonStates, sendData) => {
    const [collapsed, setCollapsed] = useState(true);
    const [logoutModal, setLogoutModal] = useState(false);
    const [BTLayerBar, setBTLayerBar] = useState(false);
    const [Schedule, setSchedule] = useState(false);
    const [BTProfile, setBTProfile] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    }

    const save = () => {
        sendData(["save", {
            ID: buttonStates.userID,
            data: buttonStates.userData
        }])
        buttonStates.setSaveLoading(true);
    }

    const viewSchedule = () => {
        setBTLayerBar(!BTLayerBar);
        setSchedule(true);
        setBTProfile(false);
    }

    const viewProfile = () => {
        setBTLayerBar(false);
        setSchedule(false);
        setBTProfile(true);
    }

    const clickLogout = () => {
        setLogoutModal(true);
    }

    const cancelLogout = () => {
        setLogoutModal(false);
    }

    const comfirmLogout = () => {
        setLogoutModal(false);
        sendData(['save', {
            ID: buttonStates.userID,
            data: buttonStates.userData
        }]);
        sendData(["logout", buttonStates.userID]);
        window.location.replace(window.location.origin);
    }

    if (buttonStates.Saved !== null){
        buttonStates.setSaved(null);
        if (buttonStates.Saved) message.success("Your data is successfully saved!");
        else message.error("There are some error occured saving your data!");
        console.log("Testing");
    }

    const personalComponent = () => buttonStates.userData ? <React.Fragment>
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" style={{float: "right"}}>
                    {buttonStates.SaveLoading ? <Spin />:<Menu.Item key="3" icon={<SaveOutlined />} onClick={save}/>}
                    <Menu.Item key="1" icon={<UserOutlined />} onClick={viewProfile}/>
                    <Menu.Item key="2" icon={<LogoutOutlined />} onClick={clickLogout}/>
                </Menu>
            </Header>
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className="select-bar">
                    <Menu theme="light" mode="inline">
                        <Menu.Item 
                            key="1" 
                            icon={<ScheduleOutlined />} 
                            onClick={viewSchedule}
                            style={{
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            Schedule List
                        </Menu.Item>
                    </Menu>
                </Sider>
                {BTLayerBar ? LayerBar(buttonStates) : <div />}
                {Schedule ? <Demo appointments={buttonStates.userData}/>: <div />}
                {BTProfile ? Profile(buttonStates) : <div />}
                <Modal
                    title="Logout"
                    centered
                    visible={logoutModal}
                    onCancel={cancelLogout}
                    footer={[
                        <Button onClick={cancelLogout}>Cancel</Button>,
                        <Button type="primary" onClick={comfirmLogout}>Yes</Button>
                    ]}
                >
                    <p>Are you sure you want to logout?</p>
                </Modal>
            </Layout>
        </Layout>
    </React.Fragment> : <React.Fragment>
        <Result 
            status="404"
            title="404"
            subTitle="There exist some error..."
        />
    </React.Fragment>;
    
    return {
        personalComponent
    };
};