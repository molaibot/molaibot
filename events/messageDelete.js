module.exports = (client, message) => {
	client.modlogs(
		{
			Member: message.author.tag,
			Action: `Message Deleted: ${message.content}`,
			Color: 'RED',
			Reason: 'I dunno? Maybe ping them and ask 🤷‍♀️',
		},
		message
	);
};
