const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create user schema and model
const UserSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    role: { type: String, default: 'USER' }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;