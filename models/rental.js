const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    user: {
        type: new mongoose.Schema({
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
        }),
        required: true,
    },
    movie: {
        type: new mongoose.Schema({
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
            cost: {
                type: String,
                required: true,
                default: "2"
            }
        }),
        required: true,
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Rental', rentalSchema);