const request = require('request')
const axios = require('axios')

//LineBot reply
module.exports = {
    reply(ReplyToken, ReplyMsg) {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {xxxxxxx}'
        }
        let body = JSON.stringify({
            replyToken: ReplyToken,
            messages: [{
                type: 'text',
                text: ReplyMsg
            }]
        })
        request.post({
            url: 'https://api.line.me/v2/bot/message/reply',
            headers: headers,
            body: body
        }, (err, res, body) => {
        });
    },
    //exchange currency
    ExchangeRate(from, to, Money, ReplyToken) {
        return axios.get('http://data.fixer.io/api/latest?access_key={xxxxxxx}').then((response) => {
            let EuroBase = 1 / response.data.rates[from];
            let Rate = EuroBase * response.data.rates[to];
            let THBcurrent = Rate * Money;
            THBcurrent = THBcurrent.toFixed(2);
            let ReplyMsg = THBcurrent + " THB"
            if (isNaN(THBcurrent)) {
                ReplyMsg = "Not Found"
            }
            this.reply(ReplyToken, ReplyMsg)
        });
    }
}