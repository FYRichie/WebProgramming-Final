require('dotenv');

const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const { send } = require('process');

//const loginMessage = require('./models/loginMessage);

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection', ws => {
    const sendData = (data) => {
        ws.send(JSON.stringify(data));
    };

    ws.onmessage = (message) => {
        const data = message.data;
        console.log(data);
        sendData(['testing']);
        const [task, payload] = JSON.parse(data);

        switch (task){
            case 'login':{
                if (/*data base has the account-passoword pair*/true){
                    sendData(['success']);
                    break;
                }
                else {
                    sendData(['error']);
                    break;
                }
            }

            case 'googlelogin':{
                if (/*將資料送到Outh2.0確認*/true) {
                    sendData(['success']);
                    break;
                }
                else {
                    sendData(['error', 'error message']);
                }
            }

            case 'clearDB':{
                
            }
        }
    };
})

const PORT = process.env.port || 4000;

server.listen(PORT, () =>{
    console.log(`Listening on http://localhost:${PORT}`)
});