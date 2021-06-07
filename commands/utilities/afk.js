const embed = require('@embeds');
const afkSchema = require('../../models/afkSchema');
module.exports = {
	name: 'afk',
	aliases: ['setafk'],
	description: 'Set your afk status',
	cooldown: 5000,
	run: async (client, message, args) => {
		const reason = args.slice(0).join(' ');

		if (!reason)
			return embed.error(
				'Please provide a reason',
				'Why are you going afk?',
				message
			);

		await afkSchema.findOne({ User: message.author.id }, async (err, data) => {
			if (data)
				return embed.error(
					"You're already AFK",
					`You set the reason to: ${data.Reason}`,
					message
				);

			if (!data) {
				new afkSchema({
					User: message.author.id,
					Reason: reason,
				})
					.save()
					.then(
						embed.embed(
							'Successfully Set Your AFK Status',
							`You are afk for: ${reason}`,
							message
						)
					);
			}
		});
	},
};
