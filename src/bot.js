// .env file
require('dotenv').config();

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', (message) => {
	console.log(`[${message.author.tag}]: ${message.content}`);
	if (message.content === 'hello') {
		message.reply('Hello there');
	}
	else if (message.content === 'ping') {
		message.reply('pong');
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORDJS_BOT_TOKEN);
