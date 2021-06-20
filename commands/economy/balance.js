const embed = require('@embeds');
const profileSchema = require('../../models/profileSchema');
module.exports = {
	name: 'balance',
	description: 'Check your account balance!',
	cooldown: 3000,
	usage: '',
	aliases: ['bal'],
	run: async (client, message, args, profileData) => {
		const user = message.mentions.users.first() || message.author;

		await profileSchema.findOne({ userID: user.id }, async (err, data) => {
			if (!data)
				return embed.error(
					"They don't exist in the database!",
					'Please ask them to run a command, so that they can be registered into the database.',
					message
				);

			if (user.id !== message.author.id)
				return embed.embed(
					`${user.tag}'s Balance:`,
					`Wallet: ${data.mCoins} mCoins\nBank: ${data.bank} mCoins`,
					message
				);

			if (user.id === message.author.id)
				return embed.embed(
					'Your balance:',
					`Wallet: ${profileData.mCoins} mCoins\nBank: ${profileData.bank} mCoins`,
					message
				);
		});
	},
};
