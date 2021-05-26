const {MesssageEmbed, MessageEmbed} = require('discord.js');
const schema = require('../../models/blacklisted-servers');
module.exports = {
    name: 'blacklist-remove',
    aliases: 'b-r',
    description: 'Remove a server from the blacklist',
    usage: '<Server ID>',
    run: async(client, message, args) => {
        if(!message.author.id === '763767239018938368') return message.channel.send('**Only MTGSquad Can Remove Servers From The Blacklist.**')
        const id = args[0];
        if(!id) return message.channel.send('Please specify a server ID to remove from the blacklist.');

        schema.findOne({ Server: id }, async(err, data) => {
            if(!data) return message.channel.send('The server is not in the blacklist!');

            const dnEmbed = new MessageEmbed()
            .setAuthor(message.author.tag)
            .setTitle('Guild Removed From The Blacklist!')
            
            data.delete().then(
                
            )
        })
    }
  }