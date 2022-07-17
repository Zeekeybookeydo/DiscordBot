// Day package for time
const dayjs = require('dayjs');

// .env for channel id
require('dotenv').config();

// Retrieve schema from template
const reminderSchema = require('../reminder-schema.js');

// Time units that are recognized
const timeUnits = {
	sec: ['second', 'seconds', 'sec', 's'],
	min: ['minute', 'minutes', 'min', 'm'],
	hr: ['hour', 'hours', 'hr', 'h'],
	day: ['day', 'days', 'd'],
	wk: ['week', 'weeks', 'wk'],
	wk2: ['fortnight', 'fortnights'],
	mo: ['month', 'months', 'mo'],
	yr: ['year', 'years', 'yr'],
	yr10: ['decade', 'decades', 'dec'],
	yr100: ['century', 'centuries', 'cent'],
	yr1000:	['millennium', 'millennia', 'millenniums'],
};

// Saves the reminder
module.exports = {
	description: 'Sets a reminder for a future date.',
	callback: (message, ...args) => {

		// If no args then command will not work
		if (args.length == 0) {
			message.channel.send('No time found.');
			return;
		}

		// Empty message
		let newMessage = '';

		// Create current time and new time to be saved
		const nowTime = dayjs();
		let newTime = nowTime;

		// Checks all of the args of command
		for (let i = 0; i < args.length; i++) {
			for (const [key, value] of Object.entries(timeUnits)) {
				// console.log(`${key}: ${value}`);

				// Switch case for time saving
				if (value.includes(args[i])) {
					switch (key) {
					case 'sec':
						newTime = newTime.add(parseInt(args[i - 1]), 's');
						break;
					case 'min':
						newTime = newTime.add(parseInt(args[i - 1]), 'm');
						break;
					case 'hr':
						newTime = newTime.add(parseInt(args[i - 1]), 'h');
						break;
					case 'day':
						newTime = newTime.add(parseInt(args[i - 1]), 'd');
						break;
					case 'wk':
						newTime = newTime.add(parseInt(args[i - 1]), 'w');
						break;
					case 'wk2':
						newTime = newTime.add(parseInt(args[i - 1]) * 2, 'w');
						break;
					case 'mo':
						newTime = newTime.add(parseInt(args[i - 1]), 'M');
						break;
					case 'yr':
						newTime = newTime.add(parseInt(args[i - 1]), 'y');
						break;
					case 'yr10':
						newTime = newTime.add(parseInt(args[i - 1]) * 10, 'y');
						break;
					case 'yr100':
						newTime = newTime.add(parseInt(args[i - 1]) * 100, 'y');
						break;
					case 'yr1000':
						newTime = newTime.add(parseInt(args[i - 1]) * 1000, 'y');
						break;
					default:
						newTime = dayjs(null);
						message.channel.send('Time unreadable, please try again.');
					}
				}
			}

			// Checks for to string which is the message
			if (args[i] === 'to') {
				newMessage += args.slice(i + 1, args.length).toString();
				newMessage = newMessage.replace(',', ' ');
			}
		}

		// Not great error checking for invalid times
		if (newTime === nowTime) {
			message.channel.send('Invalid time, please try again.');
			return;
		}

		// console.log('mongo connection');
		// console.log(mongoose.connection.readyState);

		// Save to database
		try {
			setTimeout(async () => {
				await new reminderSchema({
					message: newMessage,
					time: newTime,
					user: message.author.id,
					channel: process.env.CLIENT_ID,
				}).save();
			});
		}
		catch (error) {
			console.log(error);
			return;
		}

		// Let the channel know
		message.channel.send('Reminder set:\n' + newTime.format('MM/DD/YYYY @ hh:mm:ss a').toString() + `\n${newMessage}`);
	},
};
