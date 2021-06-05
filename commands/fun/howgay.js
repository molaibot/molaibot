const { embed, error } = require('@embeds');
const { randomInt } = require('@randomInt');
module.exports = {
	name: 'howgay',
	description: 'See how much of a sussy baka your friend is lmao',
	premium: true,
	cooldown: 25,
	run: async (client, message, args) => {
		const friend = message.mentions.users.first();

		if (!friend)
			return error(
				'No user provided',
				'How are you supposed to see how gay they are without mentioning them?',
				message
			);

		const gayamount = randomInt(1, 100);

		embed(
			`They are ${gayamount}% gay!`,
			'They could be gay. *premium only command!*',
			message
		);
	},
};
