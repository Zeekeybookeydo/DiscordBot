// Day package for time
const dayjs = require('dayjs');

// const reminderSchema = require('./reminder-schema');

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

		if (args.length == 0) {
			message.channel.send('No time found.');
			return;
		}

		const nowTime = dayjs();
		let newTime = nowTime;

		// message.channel.send(nowTime.toString());

		for (let i = 0; i < args.length; i++) {
			for (const [key, value] of Object.entries(timeUnits)) {
				// console.log(`${key}: ${value}`);
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
		}

		if (newTime === nowTime) {
			message.channel.send('Invalid time, please try again.');
			return;
		}

		message.channel.send('Reminder set');
		message.channel.send(newTime.toString());

		// async () => {
		// 	await new reminderSchema({
		// 		message: '',
		// 		time: newTime,
		// 		user: message.user,
		// 	}).save();
		// };
	},
};
