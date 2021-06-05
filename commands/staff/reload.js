const glob = require('glob');
const embed = require('../../utils/embeds');
module.exports = {
	name: 'reload',
	description: 'Reloads the commands!',
	cooldown: 1,
	run: async (client, message, args) => {
		if (message.author.id !== 'Your ID') return;
		client.commands.sweep(() => true);
		glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
			if (err) return console.log(err);
			filePaths.forEach((file) => {
				delete require.cache[require.resolve(file)];

				const pull = require(file);
				if (pull.name) {
					console.log(`Reloaded ${pull.name} (cmd)`);
					client.commands.set(pull.name, pull);
				}
				if (pull.aliases && Array.isArray(pull.aliases)) {
					pull.aliases.forEach((alias) => {
						client.aliases.set(alias, pull.name);
					});
				}
			});
		});
		embed.success(
			'Successfully Reloaded All The Commands',
			'Reloading done, any new commands should be implemented now.',
			message
		);
	},
};
