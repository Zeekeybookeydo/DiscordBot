const mongoose = require('mongoose');

const schema = new mongoose.Schema ({
	message: {
		type: String,
		required: false,
	},
	time: {
		type: Date,
		required: true,
	},
	user: {
		type: Number,
		required: true,
	},
	channel: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('reminder', schema);
