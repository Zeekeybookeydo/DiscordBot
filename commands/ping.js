// Replies pong to the user
module.exports = {
	description: 'Replies with Pong.',
	help: '!ping',
	callback: (message, ...args) => {
		console.log(args);
		message.reply('Pong!');
	},
};
