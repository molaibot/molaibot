const profileModel = require('../../models/profileSchema');
const { randomInt } = require('../../utils/randomInt');
const embed = require('../../utils/embeds');
module.exports = {
	name: 'beg',
	aliases: [],
	description: 'Beg for mCoins!',
	cooldown: 15000,
	run: async (client, message, args, profileData) => {
		const randomNumber = randomInt(1, 500);
		const response = await profileModel.findOneAndUpdate(
			{
				userID: message.author.id,
			},
			{
				$inc: {
					mCoins: randomNumber,
				},
			}
		);
		return embed.embed(
			`You begged and got ${randomNumber} mCoins!`,
			'You can beg again after 15 seconds!',
			message
		);
	},
};
