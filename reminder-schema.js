const { Dayjs } = require('dayjs');
const mongoose = require('mongoose');

const schema = new mongoose.Schema ({
	message: {
		type: String,
		required: false,
	},
	time: {
		type: Dayjs,
		required: true,
	},
	user: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('reminder', schema);
