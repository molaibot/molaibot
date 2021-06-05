const Discord = require('discord.js');

module.exports = {
	name: 'membercount',
	description: 'The MemberCount Command',
	aliases: ['mc'],
	cooldown: 1,
	run: (client, message, args) => {
		const membersInServer = message.guild.memberCount;
		const memberEmbed = new Discord.MessageEmbed()
			.setColor('#37393e')
			.setTitle(`${message.guild.name} Has ${membersInServer} Members`)
			.setTimestamp()
			.setFooter('MolaiBOT - Made By MTGSquad');

		message.inlineReply(memberEmbed);
	},
};
