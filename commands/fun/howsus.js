const { embed, error } = require('@embeds');
const { randomInt } = require('@randomInt');
module.exports = {
	name: 'howsus',
	description: 'See how much of a sussy baka your friend is lmao',
	premium: true,
	cooldown: 25,
	run: async (client, message, args) => {
		const friend = message.mentions.users.first();

		if (!friend)
			return error(
				'No user provided',
				'How are you supposed to see how sus your friend is without mentioning them?',
				message
			);

		const susamount = randomInt(1, 100);

		embed(
			`They are ${susamount}% SUS`,
			'They seem pretty sus... *premium only command!*',
			message
		);
	},
};
