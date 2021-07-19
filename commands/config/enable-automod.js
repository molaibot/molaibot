const s = require('../../models/automod');
const embed = require('../../utils/embeds');
module.exports = {
	name: 'enable-automod',
	description: 'Enable auto-moderation',
	run: async (client, message, args) => {
		await s.findOne({ guild: message.guild.id }, async (err, data) => {
			if (data) {
				embed.error(
					'Seems like its already enabled.',
					'Did you mean to disable it? Then use **`disable-automod`**!',
					message
				);
			} else {
				await s.create({
					guild: message.guild.id,
					enabled: true,
				});
				await embed.embed(
					'Successfully enabled auto-moderation!',
					'I enabled the feature for you! To disable it, use the `disable-automod` command.',
					message
				);
			}
		});
	},
};
