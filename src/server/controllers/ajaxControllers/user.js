const store = require('../../store') // TODO: USE THE PATH OF STORE FROM GLOBALS
const services = require('../../../../services/index')
const uuid = require('uuid/v1')
const md5 = require('md5')

const base_url = "http://localhost:6969/api/"

module.exports = {
    register: (req, res) => {
		store.createUser(req.body)
		.then((data) => {
			let token = uuid()
			let token_data = {
				"u_id": parseInt(data[0]),
				"token": token,
				"purpose": "register"
			}
			store.createToken(token_data)
			.then(() => {
				let link = base_url + "user/confirm?token=" + token + "&u_id=" + data[0]
				services.send_mail(
					req.body.email, "Confirm registration", "Click on this <a href="+ link +">link</a> to verify yourself"
				)
			})
			.catch(err => res.status(400).send(err))
			
			res.status(200).send({"message": "Successfully registered. Please check your mailbox for confirmation mail."})
		})
		.catch(err => res.status(400).send(err))
	},
	confirm: (req, res) => {
		store.getTokenData(req.query)
		.then((data) => {
			if(data.length > 0) {
				let token_data = data[0]
				let cur_epoch = parseInt(new Date().getTime() / 1000)
				let token_epoch = token_data.timestamp_epoch + token_data.TTL
				if(cur_epoch <= token_epoch) {
					store.verifyUser({"u_id": token_data.u_id})
					.then(() => res.status(200).send({"message": "Kudos! You are verified."}))
					.catch(err => res.status(400).send(err))
				} else {
					res.status(400).send({
						"message": "Your verification token has expired. Generate new verification link with token."
					})
				}
			} else {
				res.status(400).send({
					"message": "Looks like something went wrong. Or maybe you're trying something fishy. \
					For former case, generate new verification link,"
				})
			}
		})
		.catch(err => res.status(400).send(err))
	},
	login: (req, res) => {
		let creds = req.body
		creds.password = md5(creds.password)
		store.authenticateUser(creds)
		.then((data) => {
			if(data.length > 0) {
				let u_data = data[0]
				if(u_data.verified == 1) {
					let token = uuid()
					store.createToken({"u_id": u_data.u_id, "purpose": "login", "token": token})
					.then(() => res.send({
						"token": token, "u_id": u_data.u_id, "phone_number": u_data.phone_number,
						"address": u_data.address, "name": u_data.name, "email": u_data.email
					}))
					.catch(err => res.status(400).send(err))
				} else {
					res.status(403).send({"message": "Email address not verified!"})
				}
			} else {
				res.status(401).send({"message": "Unauthorized Access! Either email or password is incorrect"})
			}
		})
		.catch(err => res.status(400).send(err))
	}
}
