const schema = require('../../models/support'),
	embed = require('@embeds'),
	{ prefix } = require('../../config.json');

module.exports = {
	name: 'support',
	description: `Support command *(response is set with the \`${prefix}setsupport\` command!)*`,
	premium: true,
	cooldown: 1,
	run: async (client, message, args) => {
		await schema.findOne({ Guild: message.guild.id }, async (err, data) => {
			if (err) return embed.error('Error!', err, message);

			if (data) {
				embed.embed('Support', data.Message, message);
			}

			if (!data)
				return embed.error(
					'Please ask your server administrators to set this up!',
					`Contact the admins so they can set the response for this command with \`${prefix}setsupport\`!`,
					message
				);
		});
	},
};
