const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const mailer = require('./mail_service/mailer')
const app = express()

// const user = require('./user.js')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

require("./user.js")(app);

app.post('/createBookInfo', (req, res) => {
  store
    .createUser({
      title: req.body.title,
    })
    .then(() => res.send(200))
})

// app.post('/api/register', (req, res) => {
// 	store.createUser({
// 		info: req.body
// 	})
// 	.then(() => res.send(200))
// 	.catch(err => res.send(err))
// })

app.get('*', (req, res) => {
	res.send(`
		<html>
		<head>
			<title>AWESOME BOOK STORE</title>
		</head>
		<body>
			<div id="root"></div>
			<script src="bundle.js"></script>
		</body>
		<html>
	`)

})

app.listen(6969, () => {
  console.log('Server running on http://localhost:6969')
})
