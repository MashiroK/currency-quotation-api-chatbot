const mongoose = require('../db')

    //See mongodb - json userId for dialogflow
    const authSchema = new mongoose.Schema({
        userId: {
            type: String,
            require: true
        }
    })

const Auth = mongoose.model('Auth', authSchema)

module.exports = Auth