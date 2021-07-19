const Discord = require('discord.js');

module.exports = {
	name: 'profile',
	aliases: ['p'],
	description: 'Profile Info Command',
	cooldown: 1,
	run: (client, message, args, profileData) => {
		let authorInfoEmbed = new Discord.MessageEmbed()
			.setColor('#37393e')
			.setAuthor(
				message.author.tag,
				message.member.user.displayAvatarURL({ dynamic: true })
			)
			.setTitle(message.author.username)
			.addFields(
				{ name: 'User ID:', value: `${message.author.id}` },
				{ name: 'Account Created At:', value: `${message.author.createdAt}` },
				{ name: 'Full Username & Tag:', value: `${message.author.tag}` },
				{ name: 'Wallet', value: profileData.mCoins },
				{ name: 'Bank', value: profileData.bank }
			)
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
		message.reply({ embeds: [authorInfoEmbed] });
	},
};
