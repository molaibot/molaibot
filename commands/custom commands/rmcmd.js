const customCommandsModel = require('../../models/customCommandSchema');

module.exports = {
	name: 'rmcmd',
	premium: true,
	cooldown: 7000,
	description: 'Delete a custom command.',
	permission: 'MANAGE_GUILD',
	run: async (client, message, args, customCommand) => {
		if (!message.member.permissions.has('MANAGE_MESSAGES'))
			return message.reply(
				'Deleting commands requires you to have the **MANAGE_MESSAGES** permission.'
			);

		let msg = message;

		let delCommandName = args[0];

		if (!delCommandName)
			return msg.channel.send('Please Specify A Command Name!');

		try {
			await customCommandsModel.findOneAndDelete({
				serverID: message.guild.id,
				commandName: delCommandName,
			});
			await message.reply(
				`I Successfully Deleted A Command Called: ${delCommandName}!`
			);

			client.modlogs(
				{
					Member: message.author.id,
					Action: 'Command Deleted',
					Color: 'RED',
					Reason: 'Command Deleted, No Reasoning Involved.',
				},
				message
			);
		} catch (err) {
			console.log(err);
		}
	},
};
