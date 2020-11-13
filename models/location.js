const Schema = require('mongoose').Schema
const db = require('../config/db')

const Location = db.model('Location', {
    url: String,
    captureDate: Date,
    desc: String,
    lat: Number,
    lon: Number,
    name: String,
    _author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = Location