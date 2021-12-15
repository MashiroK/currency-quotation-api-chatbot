const mongoose = require('../db')

    //See mongodb - json session for dialogflow
    const authSchema = new mongoose.Schema({
        session: {
            type: String,
            require: true
        }
    })

const Auth = mongoose.model('Auth', authSchema)

module.exports = Auth