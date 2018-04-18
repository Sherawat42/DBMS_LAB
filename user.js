const store = require('./store')

module.exports = function(app){
    app.post('/api/register', (req, res) => {
		store.createUser({
			info: req.body
		})
		.then(() => res.send(200))
		.catch(err => res.send(err))
	})
}