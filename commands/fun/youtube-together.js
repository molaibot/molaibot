const fetch = require('node-fetch');
module.exports = {
	name: 'youtube-together',
	description: 'Watch youtube together!',
	aliases: ['yt-together', 'yt-t', 'youtube'],
	usage:
		'Join a voice chat and run the command to watch youtube in a voice chat.',
	cooldown: 10000,
	run: async (client, message, args) => {

		let channel = message.member.voice.channel;
		if (!channel)
			return message.channel.send(
				'You need to be in a voice chat to use youtube together.'
			);

		fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
			method: 'POST',
			body: JSON.stringify({
				max_age: 86400,
				max_uses: 0,
				target_application_id: '755600276941176913', //YT ID
				target_type: 2,
				temporary: false,
				validate: null,
			}),
			headers: {
				Authorization: `Bot ${client.token}`,
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((invite) => {
				if (!invite.code) return message.channel.send(errorEmbed);

				fetch(
					`https://discord.com/api/v9/channels/${message.channel.id}/messages`,
					{
						method: 'POST',
						body: JSON.stringify({
							content: '<:down_arrow:851497822711971880>',
							components: [
								{
									type: 1,
									components: [
										{
											type: 2,
											label: 'Start Watching!',
											style: 5,
											url: `https://discord.com/invite/${invite.code}`,
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
			});
	},
};
