module.exports = (guild) => {
	const onLeaveChannel = client.channels.cache.get('833903791321120858');

	const onLeaveEmbed = new Discord.MessageEmbed()
		.setTitle(':cry: MolaiBOT Kicked :cry:')
		.addField('Guild', '```' + guild.name + '```')
		.addField('Server Region', '```' + guild.region + '```', true)
		.addField('Guild ID', '```' + guild.id + '```', true)
		.addField('Guild Owner ID', '```' + guild.ownerID + '```', true)
		.addField('Guild Members', '```' + guild.memberCount + '```', true);

	onLeaveChannel.send(onLeaveEmbed);
};
