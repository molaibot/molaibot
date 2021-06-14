const profileModel = require('../../models/profileSchema');
module.exports = {
	name: 'deposit',
	aliases: ['dep'],
	cooldown: 3000,
	description: 'Deposit mCoins into your bank!',
	run: async (client, message, args, profileData) => {
		const amount = args[0];
		if (amount % 1 != 0 || amount <= 0)
			return message.reply('Deposit amount must be a whole number');
		try {
			if (amount > profileData.mCoins)
				return message.reply(
					`You don't have that amount of coins to deposit`
				);
			await profileModel.findOneAndUpdate(
				{
					userID: message.author.id,
				},
				{
					$inc: {
						mCoins: -amount,
						bank: amount,
					},
				}
			);

			return message.reply(
				`You deposited ${amount} of mCoins into your bank`
			);
		} catch (err) {
			console.log(err);
		}
	},
};
