const Auth = require("../db/authSchema")
const axios = require("axios")

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
        break
        //DEFAULT WELCOME INTENT END

        //COIN INTENT START
        case 'Conversion Intent':
            let coinToConvert = req.body.queryResult.parameters["unit-currency"].currency
            let coinResult = req.body.queryResult.parameters["currency-name"]
            let value = req.body.queryResult.parameters["unit-currency"].amount
                if((typeof coinToConvert || typeof coinResult || typeof value) === 'undefined') {
                    res.json({ "fulfillmentText": `Hmm, não identifiquei todos os campos requeridos. Você inseriu ambas moedas e o valor que quer converter?` })
                    break
                }       
                //change bitcoin code
                if(coinResult === 'XBT')
                    coinResult = 'BTC'
                else if(coinToConvert === 'XBT')
                    coinToConvert = 'BTC'

            const conversionURL = `${coinToConvert}-${coinResult}`
            const conversionCoins = `${coinToConvert}${coinResult}`

            try {
                const api = await axios.get(`https://economia.awesomeapi.com.br/last/${conversionURL}`) //Change API if possible later
                if(conversionCoins.includes('BTC'))
                    bid = api.data[conversionCoins].bid
                else
                    bid = parseFloat(api.data[conversionCoins].bid).toFixed(2) //For some reason, bid comes as undefined, so it needs to be parsed to apply decimal restriction

                let valueTotal = JSON.stringify(value * bid)
                valueTotal = valueTotal.replace(".",",")

                    res.json({ "fulfillmentText": `${value} ${coinToConvert} em ${coinResult} vale ${valueTotal} ${secondCoin(api.data[conversionCoins].name)}` })

            } catch (error) {
                res.send({ "fulfillmentText": "Desculpe, a moeda informada não está cadastrada no nosso sistema." })
            }
        
        break
        //COIN INTENT END

        //HELP INTENT START
        case 'Help Intent':
            res.json({ "fulfillmentText": 
            `
            Vi que você está precisando de uma ajuda!
            Neste canal, você pode fazer a conversão entre duas moedas, contando que elas existam no nosso sistema!
            Por exemplo, você pode perguntar "Quanto são 20 reais em euros?", "Quantos reais são 500 dólares?" e assim por diante!
            Mas fica a dica! É muito importante que você informe: As duas moedas, que quer converter e que será convertida, e o valor da conversão!
            Então, se não está conseguindo uma resposta, provavelmente uma dessas coisas ficou faltando!
            `
            })
        break
        //HELP INTENT END

        //QUOTATION INTENT START
        case 'Quotation Intent':
            
            if (req.body.queryResult.parameters["geral"] !== '') {
                const apiQuotation = await axios.get(`https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,JPY-BRL`)
                const coinArray = ['USD', 'EUR', 'JPY', 'BTC']
                let stringQuotation = ""
                coinArray.forEach(coin => {
                    const coinNames = `${coin}BRL`
                    let quote = apiQuotation.data[coinNames].high
                    quote = JSON.stringify(parseFloat(quote).toFixed(2)).replace(".",",")
                    quote = quote.replace(/['"]+/g, '')

                    stringQuotation = stringQuotation.concat(`Cotação do Real(BRL) em ${coin} é ${quote}` + "\n")
                    console.log(stringQuotation)
                });
                res.json({ "fulfillmentText": stringQuotation})
                break
            }

            const coinQuote = req.body.queryResult.parameters["currency-name-quote"]
            const api = await axios.get(`https://economia.awesomeapi.com.br/last/${coinQuote}-BRL`)

            const coinNames = `${coinQuote}BRL`
            let quote = api.data[coinNames].high
            quote = JSON.stringify(parseFloat(quote).toFixed(2)).replace(".",",")
            quote = quote.replace(/['"]+/g, '') //Regex to remove ""

            res.json({ "fulfillmentText": `A cotação do Real(BRL) em ${coinQuote} é $${quote} ${secondCoin(api.data[coinNames].name)}`})
        break
        //QUOTATION INTENT END

    }   
}
const test = (req, res) => {
    res.json({ "fulfillmentText": "GET controller sucessful" })
}

function secondCoin(str) {
    return str.split('/')[1]
}

module.exports = {
    intents,
    test
}