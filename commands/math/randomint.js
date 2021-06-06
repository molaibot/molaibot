const { titleOnly, error } = require('../../utils/embeds');
const { randomInt } = require('@randomInt');
module.exports = {
	name: 'randomint',
	description: 'Generate a random number',
	usage: '<min> <max>',
	run: async (client, message, args) => {
		let min = args[0];
		let max = args[1];

		if (min !== Number)
			return error(
				'Please provide a number',
				'Please give me a number, and not something else.',
				message
			);

		if (max !== Number)
			return error(
				'Please provide a number',
				'Please give me a number, and not something else.',
				message
			);

		let answer = randomInt(min, max);

		titleOnly(`You answer is: ${answer}`, message);
	},
};
