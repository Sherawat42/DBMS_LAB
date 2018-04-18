const store = require('../../store') // TODO: USE THE PATH OF STORE FROM GLOBALS


module.exports = {
    register: (req, res) => {
    	console.log(req.body);
    	throw new Error('bas!');
		store.createUser({
			info: req.body
		})
		.then(() => res.send(200))
		.catch(err => res.send(err))
	}
}
