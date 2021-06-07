const data = require('../data/Twitter.json');

exports.getTwitter = (req, res) => {
	res.json(data);
};
