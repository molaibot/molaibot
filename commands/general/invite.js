module.exports = {
	name: 'invite',
	description: 'The Invite Command.',
	aliases: ['i'],
	cooldown: 1,
	run: (client, message, args) => {
		const fetch = require('node-fetch');
		fetch(
			`https://discord.com/api/v9/channels/${message.channel.id}/messages`,
			{
				method: 'POST',
				body: JSON.stringify({
					content: 'Invite MolaiBOT To Your Server!',
					components: [
						{
							type: 1,
							components: [
								{
									type: 2,
									label: 'Click me',
									style: 5,
									url: 'http://s.molai.dev/bot',
								},
							],
						},
					],
				}),
				headers: {
					Authorization: `Bot ${client.token}`,
					'Content-Type': 'application/json',
				},
			}
		).then((res) => res.json());
	},
};
