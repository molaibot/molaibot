const embed = require('@embeds');
const afkSchema = require('../../models/afkSchema');
module.exports = {
	name: 'rm-afk',
	description: 'Remove your afk status',
	cooldown: 5000,
	run: async (client, message, args) => {
		await afkSchema.findOne({ User: message.author.id }, async (err, data) => {
			if (!data)
				return embed.error(
					'You never set your afk status',
					"You didn't set your afk status, what will i even clear!",
					message
				);

			data
				.delete()
				.then(
					embed.embed(
						'Cleared Your AFK Status!',
						'I successfully cleared your AFK status',
						message
					)
				);
		});
	},
};
