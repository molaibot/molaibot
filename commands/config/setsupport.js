const embed = require('@embeds'),
	schema = require('../../models/support'),
	{ prefix } = require('../../config.json');

module.exports = {
	name: 'setsupport',
	description: 'Set what you want to send to the user on the support command!',
	premium: true,
	cooldown: 1000,
	permission: 'MANAGE_GUILD',
	run: async (client, message, args) => {
		const msg = args.slice(0).join(' ');

		if (!msg)
			return embed.error(
				'Please provide a message',
				`Provide the message you want to send when the \`${prefix}support\` command is ran.`,
				message
			);

		await schema.findOne({ Guild: message.guild.id }, async (err, data) => {
			if (data)
				return data.delete().then(
					new schema({
						Guild: message.guild.id,
						Message: msg,
					})
						.save()
						.then(
							embed.embed(
								'Saved to the database!',
								'Successfully set the message as the response for the support command.',
								message
							)
						)
				);

			if (!data) {
				new schema({
					Guild: message.guild.id,
					Message: msg,
				})
					.save()
					.then(
						embed.embed(
							'Saved to the database!',
							'Successfully set the message as the response for the support command.',
							message
						)
					);
			}
		});
	},
};
