const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

// TODO: MAKE A GLOBALS.JS FILE WHICH ATLEAST INCLUDES PATH TO STORE AND SERVICES

// const mailer = require('./mail_service/mailer')
// The services will be required from the services module

module.exports = function(){
	const app = express()
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use(express.static('public'))


	// app.use((req,res,next)=>{
	// 	console.log('____',req.body)
	// 	req.poop = 'poop_poop';

	// 	// req.user_roles = pal_ka_function


	// 	next();
	// })

	// app.use((req,res,next)=>{
	// 	console.log(req.poop)
	// 	next();
	// })

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
