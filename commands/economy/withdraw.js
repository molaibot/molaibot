const profileModel = require('../../models/profileSchema');
module.exports = {
	name: 'withdraw',
	aliases: ['wd', 'with'],
	cooldown: 3000,
	description: 'Withdraw mCoins from your bank',
	run: async (client, message, args, profileData) => {
		const amount = args[0];
		if ((amount = all)) {
			amount = profileData.mCoins;
		}

		if (!amount === Number || !amount === 'all') {
			return message.reply(
				'That is not a number, i would accept all, but thats not even that.'
			);
		}

		try {
			if (amount > profileData.bank)
				return message.reply(
					`You don't have that amount of mCoins to withdraw`
				);

			await profileModel.findOneAndUpdate(
				{
					userID: message.author.id,
				},
				{
					$inc: {
						mCoins: amount,
						bank: -amount,
					},
				}
			);

			return message.reply(`You withdrew ${amount} of mCoins into your wallet`);
		} catch (err) {
			console.log(err);
		}
	},
};
