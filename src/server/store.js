const knex = require('knex')(require('./knexfile'))
module.exports = {
  createUser (info) {
  	info.phone_number = parseInt(info.phone_number)
    info.verified = 0;
    return knex('user').insert(info)
  },
  createToken (info) {
  	return knex('tokens').insert(info)
  },
  getTokenData (info) {
  	info.u_id = parseInt(info.u_id)
  	return knex('tokens').where(info)
  },
  verifyUser (info) {
  	return knex('user').where(info).update({"verified": 1})
  },
  authenticateUser(info) {
    return knex('user').where(info)
  },
  updateRoles(info) {
    return knex('user_role').insert(info)
  },
  updateUser(info) {
    info.u_id = parseInt(info.u_id)
    return knex('user').where({"u_id": info.u_id}).update(info)
  },
  getUserData(info) {
    return knex('user').where(info)
  }
}