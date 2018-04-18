const knex = require('knex')(require('./knexfile'))
module.exports = {
  createUser ({info}) {
  	info.phone_number = parseInt(info.phone_number)
    return knex('user').insert(info)
    return new Promise((resolve, reject)=>{
    	resolve('');
    });
  }
}