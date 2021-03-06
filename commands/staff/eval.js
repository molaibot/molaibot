const { MessageEmbed } = require('discord.js');
const SourceBin = require('sourcebin-wrapper');

module.exports = {
	name: 'eval',
	aliases: ['e'],
	owner: true,
	description: 'basically a very dangerous cmd',
	run: async (client, message, args) => {
		const embed = new MessageEmbed();

		try {
			let code = args.join(' ');
			if (!code) return message.reply('Please provide some code to evaluate');
			if (!code) return message.reply('Please provide some code to evaluate');
			code = code.replace(/(^`{3}(\w+)?|`{3}$)/g, '');
			code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
			embed.addField('📥 Input', '```js\n' + code + '```');
			let evaled;
			//If someone attempts to get the bot token
			if (
				code.includes(`BOTTOKEN`) ||
				code.includes(`TOKEN`) ||
				code.includes('process.env') ||
				code.includes('client.token')
			) {
				evaled = 'No, stop, what are you gonna do with it?';
			} else {
				evaled = eval(code);
			}

			if (typeof evaled !== 'string')
				evaled = require('util').inspect(evaled, { depth: 0 });

			let output = clean(evaled);
			if (output.length > 1024) {
				// If output exceeds 1024 characters then we will put it into a hastebin
				SourceBin.create(
					[
						new SourceBin.BinFile({
							name: 'Evaled Content',
							content: output,
							languageId: 'js',
						}),
					],
					{
						title: 'Content',
						description: 'This is awesome',
					}
				).then((result) => {
					const url = result.url;
					const embed2 = new MessageEmbed()
						.addField('📥 Input', '```js\n' + code + '```')
						.addField('📤 Output', '```js\n' + url + '```')
						.setColor(0x7289da);

					message.reply({ embeds: [embed2] });
					return;
				});
			} else {
				embed
					.addField('📤 Output', '```js\n' + output + '```')
					.setColor(0x7289da);

				message.reply({ embeds: [embed] });
			}
		} catch (error) {
			let err = clean(error);
			if (err.length > 1024) {
				// Same thing as above
				SourceBin.create(
					[
						new SourceBin.BinFile({
							name: 'Evaled Content',
							content: error,
							languageId: 'js',
						}),
					],
					{
						title: 'Content',
						description: 'This is awesome',
					}
				).then((result) => {
					const url = result.url;
					const embed3 = new MessageEmbed()
						.addField('📥 Input', '```js\n' + code + '```')
						.addField('📤 Output', '```js\n' + url + '```')
						.setColor(0x7289da);

					message.reply({ embeds: [embed3] });
					return;
				});
			} else {
				embed
					.addField('📤 Output', '```js\n' + error + '```')
					.setColor(0x7289da);
			}

			message.reply({ embeds: [embed] });
		}
	},
};

function clean(string) {
	if (typeof string === 'string') {
		return string
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203));
	} else {
		return string;
	}
}
