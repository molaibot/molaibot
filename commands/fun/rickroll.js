const { embed, error } = require('../../utils/embeds');

module.exports = {
	name: 'rickroll',
	description: 'Rick roll someone!',
	aliases: ['rr'],
	run: async (client, message, args) => {
		const user = message.mentions.users.first();

		if (!user)
			return error(
				'Please mention a user!',
				"You didn't mention a user.",
				message
			);

		message
			.reply('Rickrolled them for ya 😜')
			.then(
				user
					.send('Someone specially told me to deliver this rickroll to you!')
					.then(
						user.send(
							'https://tenor.com/view/dance-moves-dancing-singer-groovy-gif-17029825'
						)
					)
			);
	},
};
