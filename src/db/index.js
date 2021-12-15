const config = require('config')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || config.get( 'mongo.con' ))

mongoose.Promise = global.Promise

module.exports = mongoose