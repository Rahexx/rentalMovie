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
        default: "Date.now"
    },
    timeSolveProblem: {
        type: Date,
    }
});

module.exports = mongoose.model('Help', helpSchema);