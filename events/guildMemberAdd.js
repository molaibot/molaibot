const { MessageEmbed } = require('discord.js');
const schema = require('../models/setWelcome');
const e = require('../utils/embeds.json');
module.exports = async (client, member) => {
	await schema.findOne({ Guild: member.guild.id }, async (err, data) => {
		if (!data) return;

		const channel = client.channels.cache.get(data.Channel);

		const welkomEmbed = new MessageEmbed()
			.setColor(e.color)
			.setFooter(e.footer)
			.setTitle(`${member.user.tag} just joined ${member.guild.name}!`)
			.setDescription(
				`Be sure to say hi! We now have ${member.guild.memberCount} members.`
			);

		channel.send({ embeds: [welkomEmbed] });
	});
};
