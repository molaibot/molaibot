const profileModel = require('../../models/profileSchema');
module.exports = {
	name: 'give',
	description: 'Give a user some mCoins',
	cooldown: 1,
	run: async (client, message, args, profileData) => {
		if (message.member.id != '763767239018938368')
			return message.channel.send(
				`Sorry only **MTGSquad** can run this command 😔`
			);
		if (!args.length)
			return message.channel.send(
				'You need to mention a user to give them mCoins'
			);
		const amount = args[1];
		const target = message.mentions.users.first();
		if (!target) return message.channel.send('That user does not exist');

		if (amount % 1 != 0 || amount <= 0)
			return message.channel.send(
				'The amount you are giving must be a whole number'
			);

		try {
			const targetData = await profileModel.findOne({ userID: target.id });
			if (!targetData)
				return message.channel.send(`This user doens't exist in the db`);

			await profileModel.findOneAndUpdate(
				{
					userID: target.id,
				},
				{
					$inc: {
						mCoins: amount,
					},
				}
			);

			return message.channel.send(
				`This user has been given their mCoins! You gave them ${amount} mCoins!`
			);
		} catch (err) {
			console.log(err);
		}
	},
};
