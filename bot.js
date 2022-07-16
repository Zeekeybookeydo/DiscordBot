// .env file
require('dotenv').config();

// Require the necessary discord.js classes
const { Client, Intents, Collection } = require('discord.js');

// file system and path
const fs = require('node:fs');
const path = require('node:path');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Adds command property to access other command files
client.commands = new Collection();

// Gets the command path and creates array of commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Sets all of the commands from the array of file names
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Executes command
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.lerror(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORDJS_BOT_TOKEN);
