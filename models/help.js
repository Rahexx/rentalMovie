const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const helpSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: "Film nie dodal sie do mojej listy wypozyczonych filmow"
    },
    description: {
        type: String,
        required: true,
        default: "Po zakupie filmu nie dodal sie on do mojej listy wypozyczonych filmow"
    },
    message: {
        type: Array
    },
    notificationTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    timeSolveProblem: {
        type: Date,
    },
    status: {
        type: String,
        required: true,
        default: 'Oczekujacy'
    },
    user: {
        type: new mongoose.Schema({
            username: {
                type: String,
                required: true,
            },
        }),
        required: true,
    },
});

module.exports = mongoose.model('Help', helpSchema);