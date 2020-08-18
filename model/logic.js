const request = require('request')
const axios = require('axios')
const config = require('../config/config')

//LineBot reply
module.exports = {
    reply(ReplyToken, ReplyMsg) {
        let body = JSON.stringify({
            replyToken: ReplyToken,
            messages: [{
                type: 'text',
                text: ReplyMsg
            }]
        })
        axios.post('https://api.line.me/v2/bot/message/reply',body,{
            headers: config.headers
        })
        .then ((res) => {
            console.log('status = ' + res.statusCode);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    //exchange currency
    ExchangeRate(from, to, Money, ReplyToken) {
        return axios.get(config.ApiPixer).then((response) => {
            let EuroBase = 1 / response.data.rates[from];
            let Rate = EuroBase * response.data.rates[to];
            let THBcurrent = Rate * Money;
            THBcurrent = THBcurrent.toFixed(2);
            let ReplyMsg = THBcurrent + " THB"
            if (isNaN(THBcurrent)) {
                ReplyMsg = "Not Found"
            }
            console.log("from = " + from)
            console.log("to = " + to)
            console.log("Money = " + Money)
            console.log("EuroBase = " + EuroBase)
            console.log("Rate = " + Rate)
            console.log("THBcurrent = " + THBcurrent)
            console.log("ReplyMsg = " + ReplyMsg)
            console.log("ReplyToken = " + ReplyToken)
            this.reply(ReplyToken, ReplyMsg)
        });
    }
}