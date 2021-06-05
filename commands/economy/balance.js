const Discord = require('discord.js');

module.exports = {
	name: 'balance',
	description: 'Check your account balance!',
	cooldown: 3000,
	usage: '',
	aliases: ['bal'],
	run: (client, message, args, profileData) => {
		let balEmbed = new Discord.MessageEmbed()
			.setAuthor(`${message.author.tag}`)
			.setTitle(`${message.author.tag}'s Balance`)
			.setDescription(
				`Wallet: ${profileData.mCoins} mCoins\nBank: ${profileData.bank} mCoins`
			)
			.setColor('#37393e')
			.setTimestamp()
			.setFooter('MolaiBOT - Made By MTGSquad');

		let errEmbed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag)
			.setTitle(`Error: Database Record Not Found`)
			.setDescription(
				'Seems like there is no record for your profile inside the database... Could you try running `m/help`, so the the bot tries to register a record?'
			)
			.addFields({
				name: `If it still doesn't work:`,
				value:
					'Join our discord server here: `dsc.gg/devs-gg` and ping @MTGSquad#6149 with the issue.',
			})
			.setColor('#37393e')
			.setTimestamp()
			.setFooter('MolaiBOT - Made By MTGSquad');

		try {
			message.inlineReply(balEmbed);
		} catch (err) {
			console.log(err);
			message.inlineReply(errEmbed);
		}
	},
};
