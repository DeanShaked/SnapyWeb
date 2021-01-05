const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const EventSchema = new mongoose.Schema({
    title:{
        type: String,
        default:''
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('events', EventSchema)