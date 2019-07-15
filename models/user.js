const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        default: "Andrzej"
    },
    lastName: {
        type: String,
        required: true,
        default: "Andrzej"
    },
    username: {
        type: String,
        required: true,
        default: "koko"
    },
    password: {
        type: String,
        required: true,
        default: "koko"
    },
    telephone: {
        type: String,
        required: true,
        default: "111111111"
    },
    role: {
        type: String,
        default: "normal"
    },
});

module.exports = mongoose.model('User', userSchema);