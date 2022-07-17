// Sends a message of hello to the username
module.exports = {
	description: 'Says hello to whoever said the command.',
	callback: (message, ...args) => {
		console.log(args);
		message.channel.send(`Hello ${message.author.username}!`);
	},
};
