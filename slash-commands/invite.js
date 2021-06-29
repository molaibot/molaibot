const { MessageEmbed, CommandInteraction } = require('discord.js');
const e = require('../utils/embeds.json');
module.exports = {
	name: 'invite',
	description: 'Invite MolaiBOT',
	/**
	 * @param {CommandInteraction} command
	 */
	run: async (client, command) => {
		command.defer();

		const embed = new MessageEmbed()
		.setTitle("Click Me To Invite MolaiBOT!")
		.setURL("https://s.molai.dev/molaibot")
		.setColor(e.color)
		.setFooter(e.footer)
		.setTimestamp();

		command.editReply({ embeds: [embed] });
	},
};
