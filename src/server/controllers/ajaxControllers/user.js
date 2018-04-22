const store = require('../../store') // TODO: USE THE PATH OF STORE FROM GLOBALS
const services = require('../../../../services/index')
const uuid = require('uuid/v1')
const md5 = require('md5')

const base_url = "http://localhost:6969/api/"
const role_map = {"client": 1, "owner": 2, "author": 3, "publisher": 4, "delivery boy": 5}

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
			.then(() => res.status(200).send({"message": "Successfully registered. Please check your mailbox for confirmation mail."}))
			.catch(err => res.status(400).send(err))
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
	},
	updateRoles: (req, res) => {
		// req.body should be like {"roles": [role1, role2 ...], "token": <token>, "u_id": <u_id>}
		// "roles" take array of `string` roles, should be replaced by role_id instead?
		if(req.body.token == undefined) res.status(401).send({"message": "Authentication token required!"})
		store.getTokenData({"token": req.body.token, "u_id": req.body.u_id, "purpose": "login"})
		.then((data) => {
			if(data.length > 0) {
				let role_data = []
				req.body.roles.forEach((role) => {
					role_data.push({"role_id": role_map[role], "u_id": parseInt(req.body.u_id)})
				})
				store.updateRoles(role_data)
				.then(() => res.send({"message": "Roles updated"}))
				.catch(err => res.status(400).send({"message": "Some error occurred. Please try again.", "log": err}))
			} else {
				res.status(401).send({"message": "Invalid authentication token"})
			}
		})
		.catch(err => res.status(400).send(err))
	},
	updateProfile: (req, res) => {
		// name, phone number, address
		if(req.body.token == undefined) res.status(401).send({"message": "Authentication token required!"})
		store.getTokenData({"token": req.body.token, "u_id": req.body.u_id, "purpose": "login"})
		.then((data) => {
			if(data.length > 0) {
				let profile_data = {"u_id": req.body.u_id}
				if("name" in req.body) profile_data.name = req.body.name
				if("phone_number" in req.body) profile_data.phone_number = req.body.phone_number
				if("address" in req.body) profile_data.address = req.body.address
				store.updateUser(profile_data)
				.then(() => res.send({"message": "Profile updated"}))
				.catch(err => res.status(400).send({"message": "Some error occurred. Please try again.", "log": err}))
			} else {
				res.status(401).send({"message": "Invalid authentication token"})
			}
		})
		.catch(err => res.status(400).send(err))
	},
	requestResetPassword: (req, res) => {
		// phone_number or email required
		store.getUserData(req.body)
		.then((data) => {
			if(data.length > 0) {
				let token = uuid()
				store.createToken({"u_id": data[0].u_id, "token": token, "purpose": "reset"})
				.then(() => {
					let link = base_url + "/user/reset-password?token=" + token + "&u_id=" + data[0].u_id
					services.send_mail(
						data[0].email, "Password Reset", "Click <a href="+ link +">here</a> to reset password"
					)
				})
				.catch(err => res.status(400).send({"message": "Please try again.", "log": err}))
			} else {
				res.status(403).send({"message": "Account doesn't exist."})
			}
		})
		.catch(err => res.status(400).send(err))

		res.send({"message": "Check your mail for further instructions"})
	},
	resetPassword: (req, res) => {
		if(req.method == 'GET') {
			let token = req.query.token
			let u_id = req.query.u_id
			res.send(
				`<html>
					<head></head>
					<body>
						<form action="http://localhost:6969/api/user/reset-password" method="POST">
							New Password: <input type="password" name="password"/><br>
							Confirm Password: <input type="password" name="password-confirm"/><br>
							<input type="hidden" name="u_id" value="` + u_id + `"/>
							<input type="hidden" name="token" value="` + token + `"/>
							<input type="submit" value="Reset"/>
						</form>
					</body>
				</html>`
			)
		} else {
			let data = req.body
			data.u_id = parseInt(data.u_id)
			store.getTokenData({"u_id": data.u_id, "token": data.token, "purpose": "reset"})
			.then((user) => {
				if(user.length > 0) {
					store.updateUser({"u_id": data.u_id, "password": md5(data.password)})
					.then(() => res.send({"message": "Password udpated!"}))
					.catch(err => res.status(400).send(err))
				} else {
					res.status(401).send({"message": "Oopsie whoopsie, token broken or maybe some other error."})
				}
			})
			.catch(err => res.status(400).send(err))
		}
	},
	getRoles: (req, res) => {
		store.getRoles(req.query)
		.then((data) => {
			res.send(data)
		})
		.catch(err => {res.send(err)})
	}
}
