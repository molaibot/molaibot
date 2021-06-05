const fetch = require('node-fetch');
module.exports = {
	name: 'support',
	description: 'Get support',
	aliases: ['supportserver'],
	cooldown: 1,
	run: async (client, message, args) => {
		fetch(
			`https://discord.com/api/v9/channels/${message.channel.id}/messages`,
			{
				method: 'POST',
				body: JSON.stringify({
					content:
						'**Wanna Join The Support Server For MolaiBOT And An Awesome Community?**',
					components: [
						{
							type: 1,
							components: [
								{
									type: 2,
									label: 'Join The Server',
									style: 5,
									url: 'https://discord.gg/NRthkRKEXw',
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
