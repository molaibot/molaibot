const { MessageEmbed } = require('discord.js');
const e = require('./embeds.json');
require('./inlinereplies');
module.exports.error = (title, errMessage, message, color) => {
	if (!color) {
		color = '#ff0000';
	}
	const errorEmbed = new MessageEmbed()
		.setTitle(title)
		.setDescription(errMessage)
		.setColor(color)
		.setTimestamp()
		.setFooter(e.footer);

	return message.inlineReply(errorEmbed);
};

module.exports.embed = (title, embedMessage, message, color) => {
	if (!color) {
		color = e.color;
	}
	const embed = new MessageEmbed()
		.setTitle(title)
		.setDescription(embedMessage)
		.setColor(color)
		.setTimestamp()
		.setFooter(e.footer);

	return message.inlineReply(embed);
};

module.exports.titleOnly = (title, message) => {
	const embed = new MessageEmbed()
		.setColor(e.color)
		.setFooter(e.footer)
		.setTitle(title);

	return message.inlineReply(embed);
};

module.exports.imgEmbed = (title, embedMessage, imgLink, message, color) => {
	if (!color) {
		color = e.color;
	}
	const embed = new MessageEmbed()
		.setTitle(title)
		.setDescription(embedMessage)
		.setColor(color)
		.setImage(imgLink)
		.setTimestamp()
		.setFooter(e.footer);

	return message.inlineReply(embed);
};

module.exports.success = (title, succesMessage, message, color) => {
	if (!color) {
		color = '#00ff00';
	}
	const succesEmbed = new MessageEmbed()
		.setTitle(title)
		.setDescription(succesMessage)
		.setColor(color)
		.setTimestamp()
		.setFooter(e.footer);

	return message.inlineReply(succesEmbed);
};

module.exports.fieldListEmbed = (title, fields, message, color) => {
	if (!color) {
		color = '#00ff00';
	}
	const fieldListEmbed = new MessageEmbed()
		.setTitle(title)
		.addFields(fields)
		.setColor(color)
		.setTimestamp()
		.setFooter(e.footer);

	return message.inlineReply(fieldListEmbed);
};
