const express = require('express');
const router = express.Router();
const logic = require('../model/logic');

//chat bot receive input
router.post('/webhook', (req, res) => {
    let ReplyToken = req.body.events[0].replyToken
    let Msg = req.body.events[0].message.text
    let RegexMo = /([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?/;
    let CheckMoney = Msg.split(RegexMo)
    Money = CheckMoney[1]
    let NameM = CheckMoney[4]
    if ((Money === undefined && NameM === undefined && CheckMoney[3] === undefined)||CheckMoney[0].length == 3) {
        let ReplyMsg = "Please enter your desired currency exchange. \n Example: 20USD or 20usd"
        try{
            NameRate =  CheckMoney[0].toUpperCase();
            logic.ExchangeRate(NameRate, 'THB', 1, ReplyToken)
        }catch{
            logic.reply(ReplyToken, ReplyMsg)
        }
    } else if ((Money !== 'undefined' && NameM.length == 3 && CheckMoney[3] === undefined)) {
        UpCheckMoney = NameM.toUpperCase();
        logic.ExchangeRate(UpCheckMoney, 'THB', Money, ReplyToken)
    } else if ((Money !== 'undefined' && NameM === "") && isNaN(CheckMoney[3])) {
        let ReplyMsg = "Please enter your currency name."
        logic.reply(ReplyToken, ReplyMsg)
    } else if (CheckMoney[3] !== 'undefined' ||CheckMoney[5] !== 'undefined') {
        let ReplyMsg = "Please enter money to be an integer \n or \n enter a 3 character currency."
        try {
            UpCheckMoney = NameM.split(/(\w{3})/)
            UpCheckMoney = UpCheckMoney[1].toUpperCase();
            logic.ExchangeRate(UpCheckMoney, 'THB', Money, ReplyToken)
        }catch{
            logic.reply(ReplyToken, ReplyMsg)
        }
    } 
    else {
        let ReplyMsg = "This bot can't talk about anything else."
        logic.reply(ReplyToken, ReplyMsg)
    }
    res.sendStatus(200)
})
module.exports = router;