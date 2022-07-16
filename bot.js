// .env file
require('dotenv').config();

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents:
	[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Set the bot's "Playing: " status
client.on('ready', () => {
	client.user.setActivity('for monsters', { type: 'WATCHING' });
});

// Gets the commands when bot is ready
client.on('ready', () => {
	let handler = require('./command-handler');
	if (handler.default) handler = handler.default;

	handler(client);
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(process.env.DISCORDJS_BOT_TOKEN);
