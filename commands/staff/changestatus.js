const { error, embed } = require('../../utils/embeds');

module.exports = {
	name: 'changestatus',
	description: "Change the bot's status.",
	usage: '<status>',
	run: async (client, message, args) => {
		if (message.author.id !== '763767239018938368')
			return error(
				"You aren't my owner!",
				"You don't seem to be my owner, now get outta here!",
				message
			);

		const status = args.slice(0).join(' ');

		if (!status)
			return error(
				'Please provide a status!',
				'Give me the status to set.',
				message
			);

		client.user.setPresence({
			activity: { name: `${status}` },
			status: 'dnd',
		});
		await embed(
			'Successfully changed the status!',
			'My status was successfully changed.',
			message
		);
	},
};
