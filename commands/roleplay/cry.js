const { randomInt } = require('@randomInt');
const embed = require('@embeds');
module.exports = {
	name: 'cry',
	description: 'Cry in your room',
	premium: true,
	cooldown: 1,
	run: async (client, message, args) => {
		embed.imgEmbed(
			`You go to your room and start crying!`,
			`😭`,
			'https://i.pinimg.com/originals/9f/6b/7b/9f6b7bf8ba47fe7915e34b44a9db105c.gif',
			message
		);
	},
};
