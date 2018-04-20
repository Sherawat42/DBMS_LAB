const knex = require('knex')(require('./knexfile'))
module.exports = {
  createUser ({info}) {
  	info.phone_number = parseInt(info.phone_number)
    return knex('user').insert(info)
  },
  createToken ({info}) {
  	return knex('tokens').insert(info)
  },
  getTokenData ({info}) {
  	info.u_id = parseInt(info.u_id)
  	return knex('tokens').where(info)
  },
  verifyUser (info) {
  	return knex('user').where(info).update({"verified": 1})
  }
}