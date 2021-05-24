const Discord = require('discord.js')

module.exports = {
	name: 'invite',
	description: 'The Invite Command.',
	aliases: ['i'],
	run: (client, message, args) => {
		const membersInServer = message.guild.memberCount;
		const memberEmbed = new Discord.MessageEmbed()
		.setColor('#37393e')
		.setTitle(`MolaiBOT`)
        .setDescription('https://dsc.gg/molaibot')
		.setTimestamp()
		.setFooter('MolaiBOT - Made By MTGSquad')

		message.channel.send(memberEmbed)
	},
};
