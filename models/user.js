const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "normal"
    },
});

module.exports = mongoose.model('User', userSchema);