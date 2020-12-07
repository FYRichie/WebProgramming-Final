const path = require('path');
require('dotenv').config({path: path.resolve(__dirname + '../src/.env')});

const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const UserInformation = require('./models/userInformation');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

/*if (!process.env.MONGO_URL){
    console.log(__dirname);
    console.log(process.env.NODE_ENV);
    console.error('Missing MONGO_URL!!!');
    process.exit(1);
};*/
const URL = 'mongodb+srv://b08901039:f1127EE1688@webprogramming.rimw2.mongodb.net/webprogramming-hw6?retryWrites=true&w=majority';

mongoose.connect(URL, {  //need to change to process.env.MONGO_URL
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error(error);
});

db.once('open', () => {
    console.log('MongoDB connected!');

    wss.on('connection', ws => {
        const sendData = (data) => {
            ws.send(JSON.stringify(data));
        };
    
        ws.onmessage = async (message) => {
            const data = message.data;
            console.log(data);
            const [task, payload] = JSON.parse(data);
    
            switch (task){
                case 'login':{
                    await UserInformation.findOne({
                        account: payload.account,
                        password: payload.password
                    }, () => {
                        console.log("Finding account...");
                    }).exec((err, res) => {
                        if (err) throw err;
                        if (res !== null){
                            console.log("Account finded!");
                            sendData(["success", payload.ID]);
                        }
                        else {
                            console.log("Didn't find a registered account!");
                            sendData(["error"]);
                        }
                    })
                    break;
                }
                case 'clearDB':{
                    UserInformation.deleteMany({}, () => {
                        console.log("DB is cleared!");
                    })
                    break;
                }
                case 'CreateAccount':{
                    await UserInformation.findOne({account: payload.account}, () => {
                        console.log("Finding account...");
                    }).exec(async (err, res) => {
                        if (err) throw err;
                        if (res === null){
                            console.log("Find nothing.");
                            await UserInformation.insertMany(payload, () => {
                                console.log("Successfully add to DB!");
                            });
                            sendData(['success', payload.ID]);
                        }
                        else {
                            console.log("Find a same account name");
                            sendData(['error']);
                        }
                    });
                    //need to clear database after testing to much time
                    break;
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
            }
        };
    })
    
    const PORT = process.env.port || 4000;
    
    server.listen(PORT, () =>{
        console.log(`Listening on http://localhost:${PORT}`)
    });
});

