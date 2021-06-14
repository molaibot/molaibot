const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'npm',
	aliases: ['npmsearch'],
	usage: '<package>',
	cooldown: 1,
	description: 'search npm packages!',
	run: async (client, message, args) => {
		const npm = args[0];
		if (!npm) return message.reply('Please specify a npm package'); //If a package was not specified
		const url = `https://api.npms.io/v2/search?q=' + ${args[0]}`;

		let response;
		try {
			response = await fetch(url).then((res) => res.json()); // Search the package
		} catch (e) {
			return message.reply('An error has occured', e);
		}
		try {
			const pkg = response.results[0].package;
			const embed = new MessageEmbed()
				.setFooter('This command was made by awoken.')
				.setTitle(pkg.name)
				.setURL(pkg.links.npm)
				.setThumbnail(
					'https://cdn.discordapp.com/attachments/813069904613081118/830717417667297330/hZdfOHr7m2abyy6MfFtwN6bBAAAAAAAAAAAAAAAAAAAAACAX34CrC5ayvgCOKgAAAAASUVORK5CYII.png'
				)
				.addField('**❯ Author:**', pkg.author ? pkg.author.name : 'None', true) // 'None' If no author
				.addField('**❯ Version:**', pkg.version, false)
				.addField(
					'**❯ Repository:**',
					`[View Here](${
						pkg.links.repository ? pkg.links.repository : 'None'
					})`,
					false
				) // 'None' If no repo
				.addField(
					'**❯ Maintainers:**',
					pkg.maintainers
						? pkg.maintainers.map((e) => e.username).join(', ')
						: 'None',
					false
				) // 'None' If no maintain
				.addField(
					'**❯ Keywords:**',
					pkg.keywords ? pkg.keywords.join(', ') : 'None',
					false
				) // 'None' if no keywords
				.setDescription(pkg.description)
				.setTimestamp()
				.setColor('#37393e');
			message.reply(embed);
		} catch (e) {
			return message.reply(`\`${args[0]}\` is not a valid npm package`);
		}
	},
};
