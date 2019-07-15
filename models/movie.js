const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: "Mortal Kombat"
    },
    category: {
        type: String,
        required: true,
        default: "Akcja"
    },
    production: {
        type: String,
        required: true,
        default: "USA"
    },
    year: {
        type: String,
        required: true,
        default: "2000"
    },
    description: {
        type: String,
        required: true,
        default: "The best movie ever, really you must watch this film"
    },
});