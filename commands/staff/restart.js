const embed = require('../../utils/embeds');
const { exec } = require('child_process');
module.exports = {
	name: 'restart',
	cooldown: 1,
	description: 'Restart me!',
	run: async (client, message, args) => {
		if (!message.member.id === '763767239018938368') {
			embed.error(
				"You aren't my owner!",
				"Only my owner can restart me! Normies like you don't got no perms.",
				message
			);
		}

		embed
			.embed(
				'Restarting...',
				'I pulled the latest version of the code from github too!',
				message
			)
			.then(exec('git pull && pm2 restart index.js'));
	},
};
