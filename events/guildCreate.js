module.exports = (guild) => {
    const bot = client.user;

	const onJoinChannel = client.channels.cache.get('833902174115069972');

	const onJoinEmbed = new Discord.MessageEmbed()
		.setTitle(':clap: New Server Join! :clap: ')
		.addField('Guild', '```' + guild.name + '```')
		.addField('Server Region', '```' + guild.region + '```', true)
		.addField('Guild ID', '```' + guild.id + '```', true)
		.addField('Guild Owner ID', '```' + guild.ownerID + '```', true)
		.addField('Guild Members', '```' + guild.memberCount + '```', true)
		.addField(
			'When Joined',
			'```' + moment(bot.joinedAt).format('llll') + '```',
			true
		);

	onJoinChannel.send(onJoinEmbed);
}