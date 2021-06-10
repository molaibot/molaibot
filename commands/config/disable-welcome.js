const embed = require('@embeds');
const schema = require('../../models/setWelcome');
module.exports = {
	name: 'disable-leave',
	description: 'Disable leave messages.',
	premium: true,
	cooldown: 1,
	run: async (client, message, args) => {
		await schema.findOne({ Guild: message.guild.id }, async (err, data) => {
			if (!data)
				return embed.error(
					'Welcome messages are already disabled!',
					'The feature seems to be disabled already.',
					message
				);

			if (data) {
				data
					.delete()
					.then(
						embed.embed(
							'Disabled welcome messages!',
							'The feature was successfully disabled.',
							message
						)
					);
			}
		});
	},
};
