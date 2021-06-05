const profileModel = require('../../models/profileSchema');
const embed = require('../../utils/embeds');
module.exports = {
	name: 'daily',
	description: 'Get daily rewards!',
	cooldown: 43200000,
	run: async (client, message, args, profileData) => {
		const dailyReward = 1500;

		let newBal = profileData.mCoins + dailyReward;

		const params = {
			userID: message.author.id,
		};

		profileModel
			.findOneAndUpdate(params, {
				$inc: {
					mCoins: dailyReward,
				},
			})
			.then(
				embed.embed(
					'You claimed your daily rewards!',
					'You got 1500 mCoins added to your cash!',
					message
				)
			);
	},
};
