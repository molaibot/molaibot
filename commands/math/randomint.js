const { titleOnly, error } = require('../../utils/embeds');
const { randomInt } = require('@randomInt');
module.exports = {
	name: 'randomint',
	description: 'Generate a random number',
	usage: '<min> <max>',
	run: async (client, message, args) => {
		let mini = args[0];
		let maxi = args[1];

		try {
			let answer = randomInt(mini, maxi);

			titleOnly(`You answer is: ${answer}`, message);
		} catch (err) {
			error('Error!', err, message);
		}
	},
};
