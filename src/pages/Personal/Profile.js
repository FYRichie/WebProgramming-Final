import { Card, Input, Modal, Button, Upload, message, Tag, Drawer } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import React,{ useState } from 'react';
import { 
    FieldTimeOutlined,
    UploadOutlined,
    EditOutlined
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import TextEditor from "./TextEditor";
import TimelistComponent from "./TimelistComponent";  

const { Meta } = Card;

export default (props) => {
    const buttonStates = props.states;
    const [fileList, setFileList] = useState([]);
    const [editUserName, setEditUserName] = useState(false);
    const [userNameModal, setUserNameModal] = useState(false);
    const layerIndex = buttonStates.layerIndex;
    const setLayerIndex = buttonStates.setLayerIndex;
    const eventIndex = buttonStates.eventIndex;
    const setEventIndex = buttonStates.setEventIndex;
    const userNameRef = React.useRef();
    const {EditorComponent, data} = TextEditor(buttonStates, layerIndex, eventIndex);

    const changeUserName = () => {
        buttonStates.setUserData({
            userName: userNameRef.current.state.value,
            layer: buttonStates.userData.layer,
            somethingelse: buttonStates.userData.somethingelse
        });
        setEditUserName(false);
    };

    const clickEditUserName = () => {
        setEditUserName(!editUserName);
    };

    const cancelChangeUserName = () => {
        setUserNameModal(false);
        setEditUserName(false);
    };

    const showUserNameModal = (event) => {
        if (userNameRef.current.state.value !== undefined && event.key === "Enter"){
            setUserNameModal(true);
        }
    };

    const uploadProps = {
        maxCount: 1,
        listType: "picture",
        beforeUpload: file => {
            if (file.type !== "image/png"){
                message.error(`${file.name} is not a png file!`);
            }
            return file.type === "image/png";
        },
        onChange: info => {
            console.log(info);
            setFileList(info.fileList);
        },
        fileList: fileList,
        onPreview: async file => {
            console.log(file);
            console.log(file.thumbUrl);
            setFileList([]);
            buttonStates.setUserData({
                userName: buttonStates.userData.userName,
                layer: buttonStates.userData.layer,
                somethingelse:{
                    personPicture: file.thumbUrl,
                    accountCreateTime: buttonStates.userData.somethingelse.accountCreateTime
                }
            });
        }
    };

    const showEditDrawer = (LI, EI) => {
        buttonStates.setEditDrawerVisible(true);
        setLayerIndex(LI);
        setEventIndex(EI);
    }

    const closeEditDrawer = () => {
        buttonStates.setEditDrawerVisible(false);
        console.log(data);
        const _event = buttonStates.userData.layer[layerIndex].event[eventIndex];
        const _layer = buttonStates.userData.layer[layerIndex];
        const _userData = buttonStates.userData;
        const newEvent = {
            eventName: _event.eventName,
            eventTime: _event.eventTime,
            eventRepeatEveryweek: _event.eventRepeatEveryweek,
            eventData: data
        }
        const newLayer = {
            layerName: _layer.layerName,
            layerColor: _layer.layerColor,
            layerSelected: _layer.layerSelected,
            event: [..._layer.event.slice(0, eventIndex), newEvent, ..._layer.event.slice(eventIndex + 1, _layer.event.length)]
        }

        const newUserData = {
            userName: _userData.userName,
            layer: [..._userData.layer.slice(0, layerIndex), newLayer, ..._userData.layer.slice(layerIndex + 1, _userData.layer.length)],
            somethingelse: _userData.somethingelse
        }
        buttonStates.setUserData(newUserData);
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                height: window.innerHeight,
                overflow: "hidden",
                textAlign: "center",
                background: "transparent",
                borderRadius: "2px",
            }}
        >
            <div 
                style={{
                    margin: "20px 0px 0px 20px"
                }}
            >
                <Card
                    hoverable
                    style={{
                        width: "240px",
                        height: "305px"
                    }}
                    cover={<img src={buttonStates.userData.somethingelse.personPicture}/>}
                >
                    <hr 
                        style={{
                            margin: "0px 2px 0px 3px"
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row"
                        }}
                    >
                        {editUserName ? <Input 
                            placeholder={buttonStates.userData.userName}
                            onKeyUp={showUserNameModal}
                            ref={userNameRef}
                            style={{width: "140px"}}
                        />:<Meta title={buttonStates.userData.userName} style={{marginTop: "5px"}}/>}
                        <EditOutlined 
                            style={{
                                position: "absolute",
                                right: "25px",
                                marginTop: "10px"
                            }}
                            onClick={clickEditUserName}
                        />
                    </div>
                </Card>
                <ImgCrop rotate>
                    <Upload {...uploadProps}>
                        {fileList.length < 4 ? <Button 
                            icon={<UploadOutlined />} 
                            style={{margin: "5px 0px 0px 0px"}}
                        >Choose you own photo!</Button> : null}
                    </Upload>
                </ImgCrop>
            </div>
            <div
                style={{
                    margin: "20px 20px 0px 20px"
                }}
            >
                <Card hoverable>
                    <FieldTimeOutlined style={{marginRight: "3px"}}/>
                    When you create your account : {buttonStates.userData.somethingelse.accountCreateTime}
                </Card>
                <div
                    style={{
                        maxWidth: "900px",
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "17px"
                    }}
                >
                    {buttonStates.userData.layer.map((layer, layerIndex) => {
                        return(  
                            <Card 
                                title={' '} 
                                style={{
                                    width: '40%',
                                    minWidth: "250px",
                                    marginRight: "17px"
                                }} 
                                headStyle={{
                                    backgroundColor: layer.layerColor
                                }}
                                bodyStyle={{
                                    maxHeight: "460px",
                                    overflow: "auto"
                                }}
                            >
                                {layer.event.map( (element, eventIndex) => {
                                    return(
                                        <Card type="inner" title={`${element.eventName}-${layer.layerName}`} extra={<a href="#" onClick={() => {showEditDrawer(layerIndex, eventIndex)}}>More</a>} headStyle={{color: layer.layerColor}}>
                                            {element.eventTime.map((Time, TimeIndex) => {
                                                return TimelistComponent(Time, TimeIndex);
                                            })}
                                        </Card>
                                    )
                                })}
                            </Card>
                        )
                    })}
                </div>
            </div>
            <Modal
                title="Changing your name..."
                centered
                visible={userNameModal}
                onCancel={cancelChangeUserName}
                footer={[
                    <Button onClick={cancelChangeUserName}>Cancel</Button>,
                    <Button type="primary" onClick={changeUserName}>Yes</Button>
                ]}
            >
                <p>Are you sure you want to change your name?</p>
            </Modal>
            <Drawer
                    placement="right"
                    closable={true}
                    onClose={closeEditDrawer}
                    width={730}
                    visible={buttonStates.editDrawerVisible}
                    getContainer={false}
                >
                {EditorComponent}
            </Drawer>
        </div>
    );
}