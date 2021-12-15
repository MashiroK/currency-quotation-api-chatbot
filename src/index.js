const express = require("express")
const config = require("config")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = require("./routes")
app.use('/webhook', router)

const port = process.env.PORT || 3002

app.listen(port, () => console.log("Webhook running"))