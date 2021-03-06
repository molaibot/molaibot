const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['pg'],
	cooldown: 1,
	run: (client, message, args) => {
		let pingEmbed = new Discord.MessageEmbed()

			.setAuthor(
				message.author.tag,
				message.member.user.displayAvatarURL({ dynamic: true })
			)
			.setColor('#37393e')
			.setThumbnail('https://media4.giphy.com/media/fvA1ieS8rEV8Y/200.gif')
			.setDescription(`**Ping** \n ${Date.now() - message.createdTimestamp}ms.`)
			.setTimestamp()
			.setFooter('MolaiBOT - Made By MTGSquad');
		message.reply({ embeds: [pingEmbed] });
	},
};
