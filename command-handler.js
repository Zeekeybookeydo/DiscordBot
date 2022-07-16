const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

module.exports = (client) => {

	const commands = [];
	const suffix = '.js';
	const prefix = '!';
	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(suffix));

	console.log(commandFiles);

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const commandFile = require(filePath);

		commands[file.substring(0, file.lastIndexOf('.')).toLowerCase()] = commandFile;
	}

	console.log(commands);

	client.on('messageCreate', (message) => {
		if (message.author.bot || !message.content.startsWith(prefix)) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		if (!commands[commandName]) return;

		try {
			commands[commandName].callback(message, ...args);
		}
		catch (error) {
			console.error(error);
		}
	});
};
