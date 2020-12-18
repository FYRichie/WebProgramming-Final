import {NavLink} from 'react-router-dom';
import React ,{useState} from 'react';
import {Form, Button, Input, message} from 'antd';
import GoogleLogin from 'react-google-login';
import "./Login.css";

const client = new WebSocket('ws://localhost:4000');

export default () => {
    const inputAccountRef = React.createRef();
    const inputPasswordRef = React.createRef();
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
          offset: 10,
          span: 16,
        },
    };

    const sendData = (data) => {
        client.send(JSON.stringify(data));
    };

    const resetInput = () => {
        inputRef.current.resetFields();
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        if (values.account === "clearDB"){
            sendData(["clearDB"]);
        }
        else {
            sendData(["login", values]);
        }
        client.onmessage = (mes) => {
            const Mes = mes.data;
            console.log(Mes);
            const [task, payload] = JSON.parse(Mes);
            switch (task){
                case 'success':{
                    window.location.replace(window.location.origin + '/Personal/' + payload);  //need to be set to personal url,still needs modify
                    break;
                }
                case 'error':{
                    message.error("Your entering account or password has some mistake! Please try it again!");
                    inputRef.current.resetFields();
                    break;
                }
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //    handle google sign in 
    const onGoogleSignIn = (response) => {
        const {tokenId: tokenId, profileObj: profileObj} = response     //profileObj裡面有基本資料，不用確認即可拿到，可先setState
        const msg = ['googlelogin', ['tokenId', tokenId]]
        sendData(msg)
        
        client.onmessage = (mes) => {
            const Mes = mes.data;
            console.log(Mes);
            const [task, payload] = JSON.parse(Mes);
            switch (task){
                case 'success':{
                    window.location.replace(window.location.origin + '/' + payload);  //need to be set to personal url,still needs modify
                    break;
                }
                case 'error':{
                    message.error("Your entering account or password has some mistake! Please try it again!");
                    break;
                }
            }
        }
    }

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            ref={inputRef}
            className="form-block"
        >
            <Form.Item
                label="Account"
                name="account"
                rules={[
                    {
                        required: true,
                        message: "Please enter username!"
                    }
                ]}
            >
                <Input placeholder="Account" ref={inputAccountRef} className="input"/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please enter your password!"
                    }
                ]}
            >
                <Input.Password placeholder="Password" ref={inputPasswordRef} className="input"/>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
                <Button type="primary" onClick={resetInput}>
                    Reset
                </Button>
                <NavLink to="/CreateAccount">
                    <Button type="primary">
                        Start New!
                    </Button>
                </NavLink>
            </Form.Item>
            <Form.Item className="google-login">
                <GoogleLogin
                    clientId="138135020067-2p142v5fj2oo5aslq86q3l5tpu72hh9j.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={onGoogleSignIn}
                    cookiePolicy={'single_host_origin'}
                >
                    <span>使用Google登入</span>
                </GoogleLogin>
            </Form.Item>
        </Form>
    );
}