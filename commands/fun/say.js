const Discord = require('discord.js');

module.exports = {
    name: "say",
    description: "Makes the bot say whatever you want!",
    usage: "<message>",
    run: (client, message, args) => {
        let userMsg = args[0];
        
        let sayEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.member.user.displayAvatarURL({dynamic:true}))
        .setTitle(`Message From ${message.author.tag}`)
        .setDescription(userMsg)
        .setTimestamp()
        .setFooter("MolaiBOT - Made By MTGSquad");
        
        if (!userMsg) {
            return message.channel.send('Specify A Message Please!')
        } else message.channel.send(sayEmbed)  
    }
}