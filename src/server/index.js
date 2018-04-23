const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const store = require('./store')
// TODO: MAKE A GLOBALS.JS FILE WHICH ATLEAST INCLUDES PATH TO STORE AND SERVICES

// const mailer = require('./mail_service/mailer')
// The services will be required from the services module

module.exports = function(){
	const app = express()
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use(express.static('public'))

	app.use(async (req,res,next)=>{
		req.user_roles = await store.getRoles(req.body)
		.catch(err => res.status(400).send({"message": "Error occurred while getting user roles", "log": err}))
		next();
	})

	routes(app);

	app.get('*', (req, res) => {
		res.send(`
			<html>
			<head>
				<title>AWESOME BOOK STORE</title>
			</head>
			<body>
				<div id="root"></div>
				<script src="/bundle.js"></script>
			</body>
			</html>
		`)
	})
	const port = 6969;
	app.listen(port, () => {
	  console.log(`Server running on http://localhost:${port}`)
	})
}
