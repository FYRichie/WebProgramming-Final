import React, {useState} from 'react';
import {Form, Input, Button, message} from "antd";

const client = new WebSocket('ws://localhost:4000');

const idGenerator = () => ('_' + Math.random().toString(36).substr(2,16));

export default () => {
    const inputRef = React.createRef();
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
            const data = {
                account: values.account,
                password: values.password,
                ID: idGenerator(),
                hasLogin: true,
                data: {
                    userName: values.account,
                    layer: [],
                    somethingelse: {}
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
        >
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