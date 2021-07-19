const { Client, Message, MessageEmbed } = require('discord.js');
const embed = require('../../utils/embeds');
const e = require('../../utils/embeds.json');
module.exports = {
	name: 'sendmessage',
	description: 'send a message to a user',
	/**
	 * @param {Message} message
	 * @param {Client} client
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (
			message.author.id !== '763767239018938368' &&
			mesage.author.id !== '488802888928329753'
		)
			return embed.error(
				'Only My Owners Can Run This Command',
				'Only mtgsquad and botlynoob have permissions.',
				message
			);

		if (!args[0])
			return embed.error(
				'No user provided',
				'Give me user id so i can send a message',
				message
			);
		const msg = args.slice(1).join(' ');
		if (!msg)
			return embed.error('No msg provided', 'gimme a message dummy', message);

		const tousre = new MessageEmbed()
			.setTitle('Message from MolaiBOT Staff')
			.setDescription(msg)
			.setColor(e.color)
			.setFooter(e.footer);

		client.users.cache.get(args[0]).send({ embeds: [tousre] });
		await embed.embed(
			`You sent a message to: ${client.users.cache.get(args[0]).tag}`,
			msg,
			message
		);
	},
};
