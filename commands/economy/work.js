const embed = require('@embeds');
const profileModel = require('../../models/profileSchema');
const { randomInt } = require('../../utils/randomInt');
module.exports = {
	name: 'work',
	description: 'Work your butt off for some mCoins!',
	cooldown: 45000,
	run: async (client, message, args) => {
		const jobs = [
			'You babysat your neighbours child',
			'You became a bartender at the nearest shop and sold 10 bottles of tequila',
			"You became a chef at gordan ramsay's restaurant",
			'You became a bot approver at **disbots.net**',
			'You became a garbage collector at your university',
		];

		const whichJob = randomInt(0, 4);

		const salary = randomInt(500, 6347);

		const params = {
			userID: message.author.id,
		};

		await profileModel
			.findOneAndUpdate(params, {
				$inc: {
					mCoins: salary,
				},
			})
			.then(
				embed.success(`You earned: ${salary} mCoins!`, jobs[whichJob], message)
			);
	},
};
