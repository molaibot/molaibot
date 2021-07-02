const { Message } = require('discord.js');
const schema = require('../../models/prefix');
const { titleOnly } = require('../../utils/embeds');
module.exports = {
	name: 'setprefix',
	description: 'Set the custom prefix for this server.',
	usage: '<prefix>',
	permission: 'MANAGE_GUILD',
	/**
	 * @param {Message} message
	 */
	run: async (client, message, args) => {
		const newPrefix = args.slice(0).join(' ');

		if (!newPrefix) return titleOnly('Provide the new prefix please!', message);

		const params = {
			guildID: message.guild.id,
		};

		await schema
			.findOneAndUpdate(params, {
				$set: {
					prefix: newPrefix,
				},
			})
			.then(() =>
				titleOnly(
					`Successfully changed the prefix to: **${newPrefix}**`,
					message
				)
			);
	},
};
