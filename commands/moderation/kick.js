const Discord = require('discord.js');

module.exports = {
	name: 'kick',
	description: 'Kicks A Member From The Guild.',
	usage: '<@user>',
	aliases: ['k'],
	cooldown: 1,
	permission: "KICK_MEMBERS",
	run: (client, message, args) => {
		let toKick = message.mentions.members.first();
		let reason = args.slice(1).join(' ');
		if (!args[0]) return message.reply('Please mention someone to kick.');
		if (!toKick) return message.reply(`${args[0]} is not a member.`);
		if (!reason) return message.reply('Specify a reason.');

		if (!toKick.kickable) {
			return message.reply(
				'<a:CoolX:807041416735621160> I cannot kick someone that is mod/admin. <a:CoolX:807041416735621160>'
			);
		}

		if (toKick.kickable) {
			let kickEmbed = new Discord.MessageEmbed()
				.setColor('#37393e')
				.setTitle('Kick')
				.addField('Member Kicked', toKick)
				.addField('Kicked by', message.author)
				.addField('Reason', reason)
				.setTimestamp()
				.setFooter('MolaiBOT - Made By MTGSquad ~ Command By Awoken');

			message.reply({ embeds: [kickEmbed] });
			toKick.kick();

			client.modlogs(
				{
					Member: toKick,
					Action: 'Kick',
					Color: 'RED',
					Reason: reason,
				},
				message
			);
		}
	},
};
