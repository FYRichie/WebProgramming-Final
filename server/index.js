const path = require('path');
require('dotenv').config();

const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const WebSocket = require('ws');
const UserInformation = require('./models/userInformation');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const URL = 'mongodb+srv://b08901039:f1127EE1688@webprogramming.rimw2.mongodb.net/webprogramming-hw6?retryWrites=true&w=majority';
mongoose.connect(URL, {  //need to change to process.env.MONGO_URL
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

const getGoogleProfile = function(TokenId) {
    return new Promise((resolve, reject) => {
        if(!TokenId){
            resolve(null);
            return
        };
        request(`https://oauth2.googleapis.com/tokeninfo?id_token=${TokenId}`,
        function (error, response, body) {
            if (error) {console.log(error)}
            body = JSON.parse(body);
            if(body.error) {reject(body.error);}
            else {
                resolve(body);
            }
        })
    })
}

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
            //console.log(data);
            const [task, payload] = JSON.parse(data);
    
            switch (task){
                case 'login':{
                    await UserInformation.findOne({
                        account: payload.account,
                        password: payload.password
                    }, () => {
                        console.log("Finding account...");
                    }).exec(async (err, res) => {
                        if (err) throw err;
                        if (res !== null){
                            console.log("Account finded!");
                            await UserInformation.findOneAndUpdate({
                                account: payload.account,
                                password: payload.password
                            }, {
                                $set:{hasLogin:true}
                            });
                            console.log(res);
                            sendData(["success", res.ID]);
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
                    const tokenId = payload[1]
                    getGoogleProfile(tokenId)
                        .then(function (profile) {
                            if(!profile.name||!profile.email) {
                                sendData(['error']);
                                return
                            }
                            //console.log(profile)
                            sendData(['success', profile]);
                        })
                        .catch((err) => {
                            sendData(['error', err]);
                            console.log(err);
                        })
                    break;
                }
                case 'userData':{
                    await UserInformation.findOne({
                        ID:payload
                    }, () => {
                        console.log("Initializing user interface");
                    }).exec((err, res) => {
                        if (err) throw err;

                        if (res !== null && res.hasLogin){
                            console.log("Find user!Sending data...");
                            console.log(res);
                            sendData(['success', {
                                ID: res.ID,
                                data: res.data
                            }])
                        }
                        else {
                            console.log("Wrong URL!");
                            sendData(['error']);
                        }
                    })
                    break;
                }
                case 'save':{
                    await UserInformation.findOneAndUpdate({
                        ID: payload.ID
                    }, {
                        $set: {data: payload.data}
                    }, {returnOriginal: false}).exec((err, res) => {
                        if (err) throw err;

                        if (res !== null) {
                            console.log("Save success.");
                            console.log(res);
                            sendData(['save', 'success']);
                        }
                        else {
                            console.log("Save failed.");
                            sendData(['save', 'error']);
                        }
                    });
                    break;
                }
                case 'logout':{
                    await UserInformation.findOneAndUpdate({
                        ID: payload
                    }, {
                        $set: {hasLogin: false}
                    }, {returnOriginal: false}).exec((err, res) => {
                        if (err) throw err;

                        if (res !== null) {
                            console.log("Logout success.");
                            console.log(res);
                        }
                        else {
                            console.log("Logout failed.");
                        }
                    });
                }
            };
        };
    })
    
    const PORT = process.env.PORT || 4000;
    
    server.listen(PORT, () =>{
        console.log(`Listening on ${PORT}`)
    });
});