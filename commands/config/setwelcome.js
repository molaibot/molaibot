const embed = require('@embeds');
const schema = require('../../models/setWelcome');
module.exports = {
	name: 'setwelcome',
	description: 'Set the channel for welcome messages',
	premium: true,
	cooldown: 15000,
	permission: 'MANAGE_GUILD',
	run: async (client, message, args) => {
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
					'Succesfully Set the welcome channel!',
					'Changed the channel for welcome messages to the channel you provided.',
					message
				)
			);
	},
};
