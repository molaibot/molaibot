const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const Color = 'RANDOM';
const red = '#ff04a9';

module.exports = {
	name: 'grave',
	usage: 'grave <member>',
	description: 'sleep time',
	cooldown: 1,
	run: async (client, message, args) => {
		let Member =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.member;

		if (!Member) return message.inlineReply(`Invalid User!`);
		console.log(`${Member.user.displayAvatarURL()}`);
		let Embed = new MessageEmbed()
			.setImage(
				`https://vacefron.nl/api/grave?user=${Member.user.displayAvatarURL()}`
			)
			.setColor(Color);

		return message.inlineReply(Embed);

		//End
	},
};
