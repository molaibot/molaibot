const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const e = require('../utils/embeds');
const prefixSchema = require('../models/prefix');
module.exports = {
	name: 'setprefix',
	description: 'Set the custom prefix for this guild.',
	options: [
		{
			name: 'prefix',
			description: 'The New Prefix!',
			type: 'STRING',
			required: true,
		},
	],
	/**
	 * @param {Client} client
	 * @param {CommandInteraction} command
	 */
	run: async (client, command) => {
		command.defer();

		const newP = command.options.get('prefix').value;

		if (!command.member.permissions.has('MANAGE_GUILD'))
			return e.sErr(
				'You need the `MANAGE_GUILD` permission',
				'Please get the required permissions.',
				command
			);

		await prefixSchema
			.findOneAndUpdate(
				{
					guildID: command.guild.id,
				},
				{
					$set: {
						prefix: newP,
					},
				}
			)
			.then(() =>
				e.slashEmbed(
					`I set the prefix to: **${newP}**`,
					'Use this prefix from now on.',
					command
				)
			);
	},
};
