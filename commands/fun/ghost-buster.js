const { randomInt } = require('@randomInt');
const embed = require('@embeds');
module.exports = {
	name: 'ghost-buster',
	description: 'Locate the nearest ghost!',
	premium: true,
	cooldown: 1,
	run: async (client, message, args) => {
		const location = randomInt(1, 50);

		embed.embed(
			'Ghost Buster 6900',
			`The nearest ghost is ${location} meters away!`,
			message
		);
	},
};
