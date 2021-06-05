const { randomInt } = require('@randomInt');
const embed = require('@embeds');
module.exports = {
	name: 'punch',
	description: 'Punch somebody',
	premium: true,
	cooldown: 1,
	run: async (client, message, args) => {
		const punchUser = message.mentions.users.first();

		if (!punchUser)
			return embed.embed(
				'Mention Someone',
				'You forgot to mention someone',
				message
			);

		embed.imgEmbed(
			`You punched ${punchUser.tag}!`,
			`👊`,
			'https://i.imgur.com/f2kkp3L.gif',
			message
		);
	},
};
