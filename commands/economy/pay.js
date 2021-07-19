const embed = require('@embeds');
const profileModel = require('../../models/profileSchema');
const { MessageReaction } = require('discord.js');
module.exports = {
	name: 'pay',
	description: 'Pay a user!',
	run: async (client, message, args, profileData) => {
		const payUser = message.mentions.users.first();

		const amount = args[1];
		if (amount === isNaN) {
			embed.error(
				'Error',
				'Please make sure the amount you put in is a number!',
				message
			);
		}

		if (message.author.bal < 0) {
			embed.error('Error', 'You seem to be broke...', message);
		}

		if (message.author.bal < amount) {
			embed.error('Error', "You don't have enough money.", message);
		}

		if (!amount) {
			embed.error('Error', "You didn't provide the amount to give!", message);
		}

		if (!payUser) {
			embed.error('Error', "You didn't mention a user!", message);
		}

		const myParams = {
			userID: message.author.id,
		};

		const theirParams = {
			userID: payUser.id,
		};

		await profileModel.findOneAndUpdate(myParams, {
			$inc: {
				mCoins: -amount,
			},
		});
		await profileModel.findOneAndUpdate(theirParams, {
			$inc: {
				mCoins: amount,
			},
		});
		await embed.embed(
			`You sent ${amount} mCoins to ${payUser.tag}!`,
			`They'll be happy to know that you were nice and sent them ${amount} mCoins.`,
			message
		);
	},
};
