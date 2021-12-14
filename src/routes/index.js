const express = require('express')
const router = express.Router()
const controller = require('../controller')


router.post('/', controller.intents)
router.get('/', controller.test)
module.exports = router
