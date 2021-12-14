const intents = (req, res) => {
    res.json("POST controller sucessful")
}

const test = (req, res) => {
    res.json("GET controller sucessful")
}

module.exports = {
    intents,
    test
}