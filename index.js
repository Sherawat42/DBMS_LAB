const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.post('/createBookInfo', (req, res) => {
  store
    .createUser({
      title: req.body.title,
    })
    .then(() => res.sendStatus(200))
})

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

app.listen(7555, () => {
  console.log('Server running on http://localhost:7555')
})