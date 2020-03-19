const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create user schema and model
const UserSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        //unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    phoneNumber: {
        type: String
    },
    role: {
        type: String,
        default: 'ADMIN'
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;