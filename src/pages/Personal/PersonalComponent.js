import React, { useState } from "react";
import {Layout, Menu} from "antd";
import {
    UserOutlined,
    ScheduleOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "./PersonalPage.css";
import LayerBar from "./LayerBar";
import Demo from "./Demo";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

export default (buttonStates) => {
    const [collapsed, setCollapsed] = useState(true);
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    }
    const layerBlock = () => {
        if (buttonStates.BTSchedule && !buttonStates.BTProfile && !buttonStates.BTLogout) {
            return (
                LayerBar(buttonStates)
            );
        }
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
                            <Menu.Item key="1" icon={<UserOutlined />} />
                            <Menu.Item key="2" icon={<LogoutOutlined />} />
                        </Menu>
                    </Header>
                    <Layout style={{minHeight: '100vh'}}>
                        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className="select-bar">
                            <Menu theme="light" mode="inline">
                                <Menu.Item 
                                    key="1" 
                                    icon={<ScheduleOutlined />} 
                                    onClick={() => {
                                        buttonStates.setBTSchedule(!buttonStates.BTSchedule);
                                        //console.log(buttonStates.userData);
                                    }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    Schedule List
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        {layerBlock()}
                        <Demo appointments={buttonStates.userData}/>
                    </Layout>
                </Layout>
            </React.Fragment>
        );
    }
};