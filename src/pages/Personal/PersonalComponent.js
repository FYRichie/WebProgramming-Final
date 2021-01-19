import React, { useState } from "react";
import { Layout, Menu, message, Spin, Modal, Button } from "antd";
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

export default (buttonStates) => {
    const [collapsed, setCollapsed] = useState(true);
    const [logoutModal, setLogoutModal] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    }

    const save = () => {
        buttonStates.setBTSaveData(true);
    }

    const viewSchedule = () => {
        buttonStates.setBTLayerBar(!buttonStates.BTLayerBar);
        buttonStates.setSchedule(true);
        buttonStates.setBTProfile(false);
    }

    const viewProfile = () => {
        buttonStates.setBTLayerBar(false);
        buttonStates.setSchedule(false);
        buttonStates.setBTProfile(true);
    }

    const clickLogout = () => {
        setLogoutModal(true);
    }

    const cancelLogout = () => {
        setLogoutModal(false);
    }

    const comfirmLogout = () => {
        buttonStates.setLogout(true);
        setLogoutModal(false);
    }

    if (buttonStates.Saved !== null){
        setTimeout(() => {
            if (buttonStates.Saved) message.success("Your data is successfully saved!");
            else message.error("There are some error occured saving your data!");
        }, 3000);
        buttonStates.setSaved(null);
    }

    if (!buttonStates.userData) return (
        <h1>
            Wrong URL!
        </h1>
    );
    else {
        return (
            <React.Fragment>
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
                        {buttonStates.BTLayerBar ? LayerBar(buttonStates) : <div />}
                        {buttonStates.Schedule ? <Demo appointments={buttonStates.userData}/>: <div />}
                        {buttonStates.BTProfile ? Profile(buttonStates) : <div />}
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
            </React.Fragment>
        );
    }
};