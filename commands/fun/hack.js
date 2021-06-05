const Discord = require('discord.js');
const randomCountry = require('random-country');

module.exports = {
	name: 'hack',
	usage: 'hack <member>',
	description: 'the legends',
	cooldown: 1,
	run: async (client, message, args) => {
		let user = message.mentions.members.first();

		function makePasswd() {
			var passwd = '';
			var chars =
				'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#_£%^&*()-+=`~| /m:;<>{}[]?.,';
			for (i = 1; i < 8; i++) {
				var c = Math.floor(Math.random() * chars.length + 1);
				passwd += chars.charAt(c);
			}

			return passwd;
		}

		function makeEmail() {
			var strValues =
				'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
			var strEmail = [
				'@gmail.com',
				'@outlook.com',
				'@hotmail.com',
				'@icloud.com',
				'@yahoo.com',
			];
			var strTmp = '';
			for (var i = 0; i < 10; i++) {
				var c = Math.floor(Math.random() * strValues.length + 1);
				strTmp += strValues.charAt(c);
			}

			let strEmailPart = Math.floor(Math.random() * strEmail.length);

			strEmailFinal = strTmp + strEmail[strEmailPart];

			return strEmailFinal;
		}

		let regions = [
			'Brazil',
			'Europe',
			'Hong Kong',
			'India',
			'Japan',
			'Russia',
			'Singapore',
			'South Africa',
			'Sydney',
			'US Central',
			'US East',
			'US South',
			'US West',
		];

		let emailResult = makeEmail();
		let passResult = makePasswd();
		let ipResult =
			Math.floor(Math.random() * 255) +
			1 +
			'.' +
			Math.floor(Math.random() * 255) +
			'.' +
			Math.floor(Math.random() * 255) +
			'.' +
			Math.floor(Math.random() * 255);
		let regionResult = randomCountry({ full: true });

		const name = message.mentions.users.first().username;

		message.delete();
		message.inlineReply(`Hacking ${user}`).then((msg) => {
			setTimeout(function () {
				msg.edit(`**Hacking:** ${user}`).then((msg) => {
					setTimeout(function () {
						msg
							.edit(
								`**Email: **` + emailResult + '\n**Password:** ' + passResult
							)
							.then((msg) => {
								setTimeout(function () {
									msg.edit(`**ip: ** ` + ipResult).then((msg) => {
										setTimeout(function () {
											msg.edit(`**Region: ** ` + regionResult);
										}, 10000);
									}, 10000);
								}, 10000);
							});
					});
				});
			});
		});
	},
};
