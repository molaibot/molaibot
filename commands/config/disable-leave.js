const embed = require('@embeds');
const schema = require('../../models/setLeave');
module.exports = {
	name: 'disable-leave',
	description: 'Disable leave messages.',
	premium: true,
	cooldown: 1,
	run: async (client, message, args) => {
		if (!message.member.permissions.has('MANAGE_MESSAGES'))
			return embed.error(
				"You don't have permissions!",
				"You don't have permissions to perform this action.",
				message
			);

		await schema.findOne({ Guild: message.guild.id }, async (err, data) => {
			if (!data)
				return embed.error(
					'Leave messages are already disabled!',
					'The feature seems to be disabled already.',
					message
				);

			if (data) {
				data
					.delete()
					.then(
						embed.embed(
							'Disabled leave messages!',
							'The feature was successfully disabled.',
							message
						)
					);
			}
		});
	},
};
