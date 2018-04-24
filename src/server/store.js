const knex = require('knex')(require('./knexfile'))
const Promise = require('bluebird')

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
  },
  logout(token){
    return knex('tokens').delete().where(token)
  },
  getRoles(info) {
    let return_obj = {};
    return knex('tokens').where(info)
    .then((data) => {
      if(data.length > 0) {
        return knex('user').where({"u_id": data[0].u_id, "verified": 1})
        .then((u_data) => {
          if(u_data.length > 0) {
            return_obj.user = u_data[0];
            return_obj.token = info.token;
            return knex('user_role').where({"u_id": data[0].u_id})
            .then((role_data) => {
              let role_ids = []
              role_data.forEach((role) => {
                role_ids.push(role.role_id)
              })
              return knex('roles').whereIn('role_id', role_ids)
            })
          } else {
            return {"roles": []}
          }
        })
      } else {
        return {"err": "Invalid token"}
      }
    }).then(roles=>{
      return_obj.roles = roles
      return return_obj;
    })
  }
}