const Auth = require("../db/authSchema")

const intents = async (req, res) => {
    
    let displayName = req.body.queryResult.intent.displayName
    switch (displayName) {
        
        //DEFAULT WELCOME INTENT START
        case 'Default Welcome Intent':
            let session = req.body.session //Gets user session (How to get userid?)
            try {
                const sid = await Auth.findOne( { //Find session in db
                    session : req.body.session
                } ).orFail() //Throws error if not found

                if(sid.session === session) //Could also check if sid is not null
                    res.json({ "fulfillmentText": "Olá! Vi aqui que voce já usou nosso sistema antes, bem vindo novamente!" })

            } catch (error) { //Response if session does not exist!
                const sidAuth = Auth.create(req.body) //Creates entry with current session
                res.json({ "fulfillmentText": "Olá! Bem vindo ao sistema de conversão de moedas!" })
            }         
        break;
        //DEFAULT WELCOME INTENT END


    }   
}
const test = (req, res) => {
    res.json({ "fulfillmentText": "GET controller sucessful" })
}

module.exports = {
    intents,
    test
}
