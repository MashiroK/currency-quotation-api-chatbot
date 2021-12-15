const Auth = require("../db/authSchema")

const intents = async (req, res) => {
    
    let displayName = req.body.queryResult.intent.displayName
    switch (displayName) {
        
        //DEFAULT WELCOME INTENT START
        case 'Default Welcome Intent':
            let platform = req.body.originalDetectIntentRequest.source
            if(platform === 'line') {
                //Get userId from Line payload
                let userId = req.body.originalDetectIntentRequest.payload.data.source.userId
                try {
                    const uid = await Auth.findOne( { //Find uid in db
                        userId : userId
                    } ).orFail() //Throws error if not found

                    if(uid.userId === userId) //Could also check if uid is not null?
                        res.json({ "fulfillmentText": "Olá! Vi aqui que voce já usou nosso sistema antes, bem vindo novamente!"})

                } catch (error) { //Response if uid does not exist!
                    const sidAuth = Auth.create(req.body.originalDetectIntentRequest.payload.data.source) //Creates entry with userId
                    res.json({ "fulfillmentText": "Olá! Bem vindo ao sistema de conversão de moedas!" })
                }
            }
            else {
                //Default message if not on LINE
                res.json({ "fulfillmentText": "Oi! Bem vindo ao sistema de conversão de moedas!" })
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