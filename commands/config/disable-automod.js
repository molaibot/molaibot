const s = require('../../models/automod');
const embed = require('../../utils/embeds');
module.exports = {
	name: 'disable-automod',
	description: 'Disable auto-moderation',
	run: async (client, message, args) => {
		await s.findOne({ guild: message.guild.id }, async (err, data) => {
			if (!data) {
				embed.error(
					'Seems like its already disabled.',
					'Did you mean to enable it? Then use **`enable-automod`**!',
					message
				);
			} else {
				await s
					.findOneAndDelete({
						guild: message.guild.id,
					})
					.then(() =>
						embed.embed(
							'Successfully disabled auto-moderation!',
							'I disabled the feature for you! To enable it, use the `enable-automod` command.',
							message
						)
					);
			}
		});
	},
};
