const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserInformationSchema = new Schema({
    account: String,
    password: String,
    ID: String,
    hasLogin: Boolean,
    data: Object
});

const UserInformation = mongoose.model('userInformation', UserInformationSchema);
module.exports = UserInformation;