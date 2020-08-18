//test exchange current 9.5 -> 9.6
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// add routes
const router = require('./routes/router.js');
app.use(router);
app.listen(port)

/*heroku login
git init
heroku git:remote -a line-hellobot-demo
git add .
git commit -m "Initial project"
git push heroku master
heroku ps:scale web=1
*/
