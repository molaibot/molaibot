const modlogs = require('../../models/modlogs');
module.exports = {
  name: 'set-channel',
  description: 'Set the modlogs channel!',
  usage: '<channel>',
  cooldown: 1000000,
  run: async(client, message, args) => {
    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send("The **Administrator** Permission Is Required To Run This Command!");

    const channel = message.mentions.channels.first();

    modlogs.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(data) data.delete();

        new modlogs({
            Guild: message.guild.id,
            Channel: channel.id
        }).save();
        message.channel.send(`I succesfully set the mod-logs channel to: ${channel}`)
    })
  }
}