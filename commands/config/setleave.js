const embed = require('@embeds');
const schema = require('../../models/setLeave');
module.exports = {
	name: 'setleave',
	description: 'Set the channel for leave messages',
	premium: true,
	cooldown: 15000,
	run: async (client, message, args) => {
		if (!message.member.permissions.has('MANAGE_MESSAGES'))
			return embed.error(
				"You don't have permissions!",
				"You don't have permissions to perform this action.",
				message
			);

		const channel = message.mentions.channels.first().id || message.channel.id;

		schema.findOne({ Guild: message.guild.id }, async (err, data) => {
			if (data) {
				data.delete();
			}
		});

		new schema({
			Guild: message.guild.id,
			Channel: channel,
		})
			.save()
			.then(
				embed.embed(
					'Succesfully Set the leave channel!',
					'Changed the channel for leave messages to the channel you provided.',
					message
				)
			);
	},
};
