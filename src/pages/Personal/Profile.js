import { Card, Input, Modal, Button, Upload, message, Tag, Drawer } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import React,{ useState } from 'react';
import { 
    FieldTimeOutlined,
    UploadOutlined,
    EditOutlined
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { ContactSupportOutlined } from '@material-ui/icons';

const { Meta } = Card;

export default (props) => {
    const buttonStates = props.states;
    const [fileList, setFileList] = useState([]);
    const [editUserName, setEditUserName] = useState(false);
    const [userNameModal, setUserNameModal] = useState(false);
    const userNameRef = React.useRef();

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

    const showEditDrawer = () => {
        buttonStates.setEditDrawerVisible(true);
    }

    const closeEditDrawer = () => {
        buttonStates.setEditDrawerVisible(false);
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                position: "absolute",
                height: window.innerHeight,
                overflow: "hidden",
                textAlign: "center",
                background: "transparent",
                borderRadius: "2px",
                right: "0px"
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
                            style={{margin: "5px 0px 0px 17px"}}
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
                    {buttonStates.userData.layer.map(layer => {
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
                                {layer.event.map( (element, index) => {
                                    return(
                                        <Card type="inner" title={`${element.eventName}-${layer.layerName}`} extra={<a href="#" onClick={showEditDrawer}>More</a>} headStyle={{color: layer.layerColor}}>
                                            {`from ${(new Date(Date.parse(element.eventTime[0].startTime))).toString().slice(0, 
                                                (new Date(Date.parse(element.eventTime[0].startTime))).toString().length - 15)}`}<br/>{`to ${(new Date(Date.parse(element.eventTime[0].endTime))).toString().slice(0,
                                                (new Date(Date.parse(element.eventTime[0].endTime))).toString().length - 15)}`}
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
                    visible={buttonStates.editDrawerVisible}
                    getContainer={false}
                    style={{
                        position: "absolute",
                        right: "0px",
                        backgroundColor: "green"
                    }}
                >
                {/*add ckeditor */}
            </Drawer>
        </div>
    );
}
