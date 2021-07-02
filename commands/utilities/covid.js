const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'covid',
	cooldown: 1,
	description: 'Track a country or worldwide COVID-19 cases',
	aliases: ['coronavirus', 'covid19', 'corona'],
	run: async (client, message, args) => {
		let countries = args.join(' ');

		//Credit to Sarastro#7725 for the command :)

		const noArgs = new Discord.MessageEmbed()
			.setTitle('Missing arguments')
			.setColor('#37393e')
			.setDescription(
				'You are missing some args (ex: `m/covid all` || `m/covid Canada`)'
			)
			.setTimestamp();

		if (!args[0]) return message.reply({ embeds: [noArgs] });

		if (args[0] === 'all') {
			fetch(`https://covid19.mathdro.id/api`)
				.then((response) => response.json())
				.then((data) => {
					let confirmed = data.confirmed.value.toLocaleString();
					let recovered = data.recovered.value.toLocaleString();
					let deaths = data.deaths.value.toLocaleString();

					const embed = new Discord.MessageEmbed()
						.setTitle(`Worldwide COVID-19 Stats 🌎`)
						.addField('Confirmed Cases', confirmed)
						.addField('Recovered', recovered)
						.addField('Deaths', deaths);

					message.reply({ embeds: [embed] });
				});
		} else {
			fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
				.then((response) => response.json())
				.then((data) => {
					let confirmed = data.confirmed.value.toLocaleString();
					let recovered = data.recovered.value.toLocaleString();
					let deaths = data.deaths.value.toLocaleString();

					const embed = new Discord.MessageEmbed()
						.setColor('#37393e')
						.setTitle(`COVID-19 Stats for **${countries}**`)
						.addField('Confirmed Cases', confirmed)
						.addField('Recovered', recovered)
						.addField('Deaths', deaths);

					message.reply({ embeds: [embed] });
				})
				.catch((e) => {
					return message.reply('Invalid country provided');
				});
		}
	},
};
