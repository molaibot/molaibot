const { MessageEmbed } = require('discord.js');
const schema = require('../models/setLeave');
const e = require('../utils/embeds.json');
module.exports = async (client, member) => {
	await schema.findOne({ Guild: member.guild.id }, async (err, data) => {
		if (!data) return;

		const channel = client.channels.cache.get(data.Channel);

		const leaveEmbed = new MessageEmbed()
			.setColor(e.color)
			.setFooter(e.footer)
			.setTitle(`${member.user.tag} left ${member.guild.name}!`)
			.setDescription(
				`Sad to see them go. We now have ${member.guild.memberCount} members.`
			);

		channel.send({ embeds: [leaveEmbed] });
	});
};
