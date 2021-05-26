const {MesssageEmbed, MessageEmbed} = require('discord.js');
const schema = require('../../models/blacklisted-servers');
module.exports = {
  name: 'blacklist-add',
  aliases: 'b-a',
  description: 'Add a server to the blacklist',
  usage: '<Server ID>',
  run: async(client, message, args, e) => {
    if(!message.author.id === '763767239018938368') return message.channel.send('**Only MTGSquad Can Add Servers To The Blacklist.**');
    const id = args[0];
    if(!id) return message.channel.send('Please specify a server ID to blacklist.');

    if(!client.guilds.cache.has(id)) return message.reply('It seems like I am not in the server you want to blacklist.');

    schema.findOne({ Server: id }, async(err, data) => {
        if(data) return message.reply('This server is already blacklisted.');

        new schema({
            Server: id
        }).save();
        const dnEmbed = new MessageEmbed()
        .setAuthor(message.author.tag)
        .setTitle("Server added to the blacklisted")
        .setDescription(`You blacklisted the server with this ID: ${id}`)
        .setFooter(e.footer)
        .setColor(e.color);

        message.channel.send(dnEmbed);
    });
  }
}