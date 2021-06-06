const { titleOnly, error } = require('../../utils/embeds');
const { randomInt } = require('@randomInt');
module.exports = {
	name: 'randomint',
	description: 'Generate a random number',
	usage: '<min> <max>',
	run: async (client, message, args) => {
		let min = args[0];
		let max = args[1];

		try{
			
		let answer = randomInt(min, max);

		titleOnly(`You answer is: ${answer}`, message);

		}catch(err) {
			error("Error!", err, message);
		}
	},
};
