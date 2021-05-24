const Discord = require('discord.js');

module.exports = {
	name: 'stats',
	description: 'Info About The Server.',
	aliases: ['s'],
	run: (client, message, args) => {
		let serverEmbed = new Discord.MessageEmbed()
		.setColor('#37393e')
		.setAuthor(message.author.tag, message.member.user.displayAvatarURL({dynamic:true}))
		.setTitle(`Stats For ${message.guild.name}`)
		.setDescription(`Total members: ${message.guild.memberCount}`)
		.setTimestamp()
		.setFooter('MolaiBOT - Made By MTGSquad')
		message.channel.send(serverEmbed);
	}
}
