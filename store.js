const knex = require('knex')(require('./knexfile'))
module.exports = {
  createUser ({title}) {
    console.log(`Add book_info ${title}`)
    return knex('book_info').insert({
      title
    })
  }
}