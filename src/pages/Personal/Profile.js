import { Card, Input, Modal, Button, Upload, message } from 'antd';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import React,{ useState } from 'react';
import { 
    FieldTimeOutlined,
    UploadOutlined,
    EditOutlined
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

const { Meta } = Card;

export default (buttonStates) => {
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

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row"
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
                    margin: "20px 0px 0px 20px"
                }}
            >
                <Card
                    hoverable
                    onClick={() => {
                        window.open("http://localhost:3000");
                        //newWindow.focus();
                    }}
                >
                    <FieldTimeOutlined style={{marginRight: "3px"}}/>
                    When you create your account : {buttonStates.userData.somethingelse.accountCreateTime}
                </Card>
                {/* {buttonStates.userData.map(element => {
                    <Card maxWidth="345">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                title={element.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {element.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {element.startDate}
                                    {element.endDate}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                })} */}
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
        </div>
    );
}
