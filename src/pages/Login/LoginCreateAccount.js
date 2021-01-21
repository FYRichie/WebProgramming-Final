import React, {useState} from 'react';
import {Form, Input, Button, message, Image} from "antd";
import defaultPerson from "../../images/defaultPerson.png";
import CreatePicture from "../../images/CreatePicture.png";
require('dotenv').config();

const URL = process.env.REACT_APP_baseURL || 'ws://localhost:80';
const client = new WebSocket(URL);

const idGenerator = () => ('_' + Math.random().toString(36).substr(2,16));

export default () => {
    const inputRef = React.createRef();
    const pictureLayout = {
        wrapperCol: {
            offset: 10
        }
    }
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 16,
        },
    };

    const sendData = (data) => {
        client.send(JSON.stringify(data));
    };
    const resetInput = () => {
        message.warning("Reset all inputs.");
        inputRef.current.resetFields();
    };
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(inputRef.current);
        if (values.password !== values.passwordComfirm){
            message.error("Password certification has some mistake!");
        }
        else {
            const current = new Date();
            const data = {
                account: values.account,
                password: values.password,
                ID: idGenerator(),
                hasLogin: true,
                data: {
                    userName: values.account,
                    layer: [],
                    somethingelse: {
                        personPicture: defaultPerson,
                        accountCreateTime: current.toUTCString()
                    }
                }
            }
            const msg = ['CreateAccount', data];
            sendData(msg);

            client.onmessage = (mes) => {
                const Mes = mes.data;
                console.log(Mes);
                const [task, payload] = JSON.parse(Mes);
                switch (task){
                    case "success":{
                        window.location.replace(window.location.origin + '/Personal/' + payload);
                        break;
                    }
                    case "error":{
                        message.error("The account has been used! Please use a new name!");
                        inputRef.current.resetFields();
                        break;
                    }
                }
            }
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            ref={inputRef}
            style={{
                background: "linear-gradient(90deg, #003D79, rgb(62, 151, 183) 500px)",
                height: window.innerHeight
            }}
        >
            <Form.Item
                {...pictureLayout}
            >
                <Image 
                    src={CreatePicture}
                    width={200}
                    style={{
                        marginTop: "50px"
                    }}
                />
            </Form.Item>
            <Form.Item
                label="Account"
                name="account"
                rules={[
                    {
                        required: true,
                        message: "Please enter an account name!"
                    }
                ]}
            >
                <Input placeholder="Account name" className="input"/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please enter password!"
                    }
                ]}
            >
                <Input.Password placeholder="Password" className="input"/>
            </Form.Item>
            <Form.Item
                label="Comfirm Password"
                name="passwordComfirm"
                rules={[
                    {
                        required: true,
                        message: "Please enter your password again!"
                    }
                ]}
            >
                <Input.Password placeholder="Comfirm password" className="input"/>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button type="primary" onClick={resetInput}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
}