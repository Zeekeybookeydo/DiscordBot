// Sends a message of hello to the username
module.exports = {
	callback: (message, ...args) => {
		console.log(args);
		message.channel.send(`Hello ${message.author.username}!`);
	},
};
