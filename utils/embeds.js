const { MessageEmbed, Message } = require('discord.js');
const e = require('./embeds.json');
/**
 * 
 * @param {Message} message
 */

module.exports.error = (title, errMessage, message, color) => {
    if (!color) {
        color = '#ff0000'
    }
    const errorEmbed = new MessageEmbed()
    .setTitle(title)
    .setDescription(errMessage)
    .setColor(color)
    .setTimestamp()
    .setFooter(e.footer)
    
    return message.channel.send(errorEmbed)
}

module.exports.embed = (title, embedMessage, message, color) => {
    if (!color) {
        color = e.color
    }
    const embed = new MessageEmbed()
    .setTitle(title)
    .setDescription(embedMessage)
    .setColor(color)
    .setTimestamp()
    .setFooter(e.footer)
    
    return message.channel.send(embed)
}

module.exports.success = (title, succesMessage, message, color) => {
    if (!color) {
        color = '#00ff00' 
    }
    const succesEmbed = new MessageEmbed()
    .setTitle(title)
    .setDescription(succesMessage)
    .setColor(color)
    .setTimestamp()
    .setFooter(e.footer)

    return message.channel.send(succesEmbed)
}

module.exports.fieldListEmbed = (title, fields, message, color) => {
    if (!color) {
        color = '#00ff00'
    }
    const fieldListEmbed = new MessageEmbed()
    .setTitle(title)
    .addFields(fields)
    .setColor(color)
    .setTimestamp()
    .setFooter(e.footer)

    return message.channel.send(fieldListEmbed)
}