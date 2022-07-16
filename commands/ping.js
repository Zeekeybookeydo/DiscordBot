// Replies pong to the user
module.exports = {
	callback: (message, ...args) => {
		console.log(args);
		message.reply('Pong');
	},
};
