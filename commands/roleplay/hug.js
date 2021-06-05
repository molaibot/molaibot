const { randomInt } = require('@randomInt');
const embed = require('@embeds');
module.exports = {
	name: 'hug',
	description: 'Hug somebody',
	premium: true,
	cooldown: 1,
	run: async (client, message, args) => {
		const hugUser = message.mentions.users.first();

		if (!hugUser)
			return embed.embed(
				'Mention Someone',
				'You forgot to mention someone',
				message
			);

		embed.imgEmbed(
			`You hugged ${hugUser.tag}!`,
			`🤗`,
			'https://thumbs.gfycat.com/BlueDecimalAardwolf-max-1mb.gif',
			message
		);
	},
};
