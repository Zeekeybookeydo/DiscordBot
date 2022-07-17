// Replies pong to the user
module.exports = {
	description: 'Replies with Pong.',
	callback: (message, ...args) => {
		console.log(args);
		message.reply('Pong!');
	},
};
