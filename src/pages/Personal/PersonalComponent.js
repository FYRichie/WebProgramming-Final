import React, { useState } from "react";
import { Layout, Menu, message, Spin, Modal, Button, Result, Card } from "antd";
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
import Producer from "../../images/Producer.png"
import { Description } from "@material-ui/icons";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const {Meta} = Card;

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

    const Description = <>This website is for you to schedule your busy days.
        <br />Also you can make some notes for your schedules.
        <br />Hope you like the design.    
        <br />by 黃曜廷 傅譽 郭尚睿"
        <br />2020-01-21
    </>
    const def = <Card
        hoverable
        style={{
            width: "1000px",
            height: "610px",
            margin: "20px 0px 0px 20px"
        }}
        cover={<img src={Producer}/>}
    >
        <Meta 
            title="Welcome to use our development!" 
            description={Description}
        />
    </Card>;

    return (
        buttonStates.userData ? <React.Fragment>
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" style={{float: "right"}}>
                    {buttonStates.SaveLoading ? <Spin />:<Menu.Item key="3" icon={<SaveOutlined />} onClick={save}/>}
                    <Menu.Item key="1" icon={<UserOutlined />} onClick={viewProfile}/>
                    <Menu.Item key="2" icon={<LogoutOutlined />} onClick={clickLogout}/>
                </Menu>
            </Header>
            <Layout style={{
                minHeight: '100vh',
                background: "linear-gradient(90deg, #003D79, rgb(62, 151, 183) 500px)",
            }}>
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
                {!BTLayerBar && !Schedule && !BTProfile ? def : null}
                {BTLayerBar ? <LayerBar states={buttonStates} /> : null}
                {Schedule ? <Demo appointments={buttonStates.userData}/> : null}
                {BTProfile ? <Profile states={buttonStates}/> : null}
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
    </React.Fragment>);
};